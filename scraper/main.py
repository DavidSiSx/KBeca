import os
import hashlib
from typing import List, Optional
from dotenv import load_dotenv
import psycopg2
from pydantic import BaseModel, Field
import instructor
from openai import OpenAI
from playwright.sync_api import sync_playwright
from tenacity import retry, wait_exponential, stop_after_attempt

# Cargar variables de entorno
load_dotenv(dotenv_path='../.env.local')

# Setup de Instructor + OpenAI (o modelo compatible)
# Nota: Configurar OPENAI_API_KEY en .env.local
client = instructor.from_openai(OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy")))

# --- 1. Definición Determinista (Pydantic) ---
class ScholarshipExtraction(BaseModel):
    title: str = Field(description="Nombre oficial de la convocatoria.")
    institution_name: str = Field(description="Entidad gubernamental o privada que la emite.")
    target_states: Optional[List[str]] = Field(
        description="Lista de estados exactos si es regional. Si dice 'Nacional' o 'Todo el país', retorna null."
    )
    academic_levels: List[str] = Field(
        description="Debe ser estrictamente una lista con valores: 'Básica', 'Media Superior', 'Superior', 'Posgrado'."
    )
    deadline: Optional[str] = Field(description="Fecha límite en formato YYYY-MM-DD. Null si no se especifica.")
    description: str = Field(description="Resumen conciso de los beneficios de la beca en lenguaje claro.")

# --- 2. Funciones de Extracción (Playwright) ---
def extract_text_from_url(url: str) -> str:
    print(f"🕷️ Extrayendo DOM de: {url}")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navegación con timeout para evitar bloqueos
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        
        # Estrategia de ahorro de tokens: remover scripts, navs, footers, styles
        page.evaluate('''() => {
            const elementsToRemove = document.querySelectorAll('script, style, nav, footer, header, iframe, noscript');
            elementsToRemove.forEach(el => el.remove());
        }''')
        
        text_content = page.evaluate("document.body.innerText")
        browser.close()
        
        # Limpiar texto de excesos de saltos de línea (ahorro de tokens)
        clean_text = ' '.join(text_content.split())
        return clean_text

# --- 3. Parseo Determinista (Instructor + LLM) ---
@retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(3))
def parse_scholarship_text(text: str) -> ScholarshipExtraction:
    print("🧠 Analizando texto con LLM (Instructor)...")
    # Limitar el tamaño del texto para no exceder la ventana de contexto
    truncated_text = text[:8000] 
    
    return client.chat.completions.create(
        model="gpt-4o-mini",
        response_model=ScholarshipExtraction,
        messages=[
            {"role": "system", "content": "Eres un analista legal rígido. Tu única tarea es leer texto de convocatorias de becas mexicanas y mapearlo al esquema JSON. Si una información no se menciona explícitamente, retorna null. No inventes datos."},
            {"role": "user", "content": f"Extrae los datos de esta convocatoria:\n\n{truncated_text}"}
        ]
    )

# --- 4. Idempotencia y Upsert (PostgreSQL) ---
def upsert_scholarship(data: ScholarshipExtraction):
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ Faltan credenciales de BD.")
        return
        
    # Generar Hash SHA-256 para idempotencia
    hash_input = f"{data.title}{data.institution_name}".encode('utf-8')
    hash_id = hashlib.sha256(hash_input).hexdigest()
    
    try:
        print(f"💾 Guardando en PostgreSQL (Hash: {hash_id[:8]})...")
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Manejo correcto de arreglos PostgreSQL
        target_states = data.target_states if data.target_states else None
        academic_levels = data.academic_levels
        
        # Sentencia UPSERT (ON CONFLICT)
        query = """
            INSERT INTO scholarships (hash_id, title, institution_name, description, target_states, academic_levels, deadline)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (hash_id) DO UPDATE SET 
                description = EXCLUDED.description,
                target_states = EXCLUDED.target_states,
                academic_levels = EXCLUDED.academic_levels,
                deadline = EXCLUDED.deadline,
                updated_at = NOW();
        """
        
        cur.execute(query, (
            hash_id, data.title, data.institution_name, data.description, 
            target_states, academic_levels, data.deadline
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Beca procesada exitosamente.")
        
    except Exception as e:
        print(f"❌ Error en base de datos: {e}")

# --- Flujo Principal ---
if __name__ == "__main__":
    # Ejemplo de prueba (Reemplazar por array de URLs gubernamentales)
    TEST_URL = "https://example.com/beca-ficticia" 
    print(f"🚀 Iniciando Pipeline de Extracción: {TEST_URL}")
    
    # IMPORTANTE: En entorno real, descomentar cuando se agreguen URLs reales y OPENAI_API_KEY
    # raw_text = extract_text_from_url(TEST_URL)
    # scholarship_data = parse_scholarship_text(raw_text)
    # upsert_scholarship(scholarship_data)
    
    print("🚧 Fin de la ejecución (Modo Demo/Estructura). Para activar, configura OPENAI_API_KEY y URLs.")
