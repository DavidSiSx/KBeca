import os
import hashlib
from typing import List, Optional, Literal
from dotenv import load_dotenv
import psycopg
from pydantic import BaseModel, Field
import instructor
from google import genai
from google.genai import types
from playwright.sync_api import sync_playwright
from tenacity import retry, wait_exponential, stop_after_attempt

# Cargar variables de entorno
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
load_dotenv(dotenv_path=dotenv_path)

def get_gemini_client():
    import random
    keys = [os.environ.get("GEMINI_API_KEY1"), os.environ.get("GEMINI_API_KEY2")]
    valid_keys = [k for k in keys if k]
    api_key = random.choice(valid_keys) if valid_keys else "dummy"
    
    return genai.Client(api_key=api_key)
class ScholarshipExtraction(BaseModel):
    title: str = Field(description="Nombre oficial de la convocatoria.")
    institution_name: str = Field(description="Entidad gubernamental o privada que la emite.")
    target_states: Optional[List[str]] = Field(
        description="Lista de estados exactos si es regional. Si dice 'Nacional' o 'Todo el país', retorna null."
    )
    target_groups: Optional[List[Literal[
        "Excelencia académica",
        "Discapacidad",
        "Prioridad socioeconómica",
        "Indígenas",
        "Madres o padres solteros",
        "Embarazadas",
        "Enfermedad crónica",
        "Zonas rurales o marginadas",
        "Adultos mayores"
    ]]] = Field(
        description="Grupos poblacionales a los que va dirigida. Elige EXCLUSIVAMENTE de las opciones dadas. Null si es para el público en general."
    )
    academic_levels: List[str] = Field(
        description="Debe ser estrictamente una lista con valores: 'Básica', 'Media Superior', 'Superior', 'Posgrado'."
    )
    call_date: Optional[str] = Field(description="Fecha de apertura de la convocatoria o fecha de publicación en formato YYYY-MM-DD. Null si no se especifica.")
    deadline: Optional[str] = Field(description="Fecha límite o cierre en formato YYYY-MM-DD. Null si no se especifica.")
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

@retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(3))
def parse_scholarship_text(text: str) -> ScholarshipExtraction:
    print("🧠 Analizando texto con LLM (Google GenAI Nativo)...")
    # Limitar el tamaño del texto para no exceder la ventana de contexto
    truncated_text = text[:30000] 
    
    client = get_gemini_client()
    response = client.models.generate_content(
        model='gemini-3.1-flash-lite',
        contents=f"Eres un analista experto en becas mexicanas. Extrae los datos de la convocatoria al esquema JSON. INSTRUCCIONES CRÍTICAS:\n1. target_states: Si el texto menciona 'Gobierno de [Estado]' o secretarías locales (ej. 'Estado de Yucatán'), extrae ese estado obligatoriamente (ej. 'Yucatán'). Retorna null SOLO si es una beca federal o nacional explícita.\n2. Si otro dato no se menciona, retorna null. No inventes.\n\nTexto de la convocatoria:\n{truncated_text}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ScholarshipExtraction,
            safety_settings=[
                types.SafetySetting(
                    category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold=types.HarmBlockThreshold.BLOCK_ONLY_HIGH,
                ),
                types.SafetySetting(
                    category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold=types.HarmBlockThreshold.BLOCK_ONLY_HIGH,
                ),
                types.SafetySetting(
                    category=types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold=types.HarmBlockThreshold.BLOCK_ONLY_HIGH,
                ),
                types.SafetySetting(
                    category=types.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold=types.HarmBlockThreshold.BLOCK_ONLY_HIGH,
                ),
            ],
        ),
    )
    return ScholarshipExtraction.model_validate_json(response.text)

# --- 4. Idempotencia y Upsert (PostgreSQL) ---
def upsert_scholarship(data: ScholarshipExtraction, url: str):
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ Faltan credenciales de BD.")
        return
        
    # Eliminar parámetro pgbouncer que causa error en psycopg3
    db_url = db_url.replace("?pgbouncer=true", "").replace("&pgbouncer=true", "")
        
    # Generar Hash SHA-256 para idempotencia basado en la URL
    hash_input = url.encode('utf-8')
    hash_id = hashlib.sha256(hash_input).hexdigest()
    
    try:
        # Generar embedding semántico
        print("🧠 Generando vector semántico (Embedding)...")
        client = get_gemini_client()
        embedding_text = f"{data.title}. {data.description}"
        emb_result = client.models.embed_content(
            model='gemini-embedding-2',
            contents=embedding_text,
            config=types.EmbedContentConfig(output_dimensionality=768)
        )
        embedding_vector = emb_result.embeddings[0].values
        embedding_str = "[" + ",".join(map(str, embedding_vector)) + "]"

        print(f"💾 Guardando en PostgreSQL (Hash: {hash_id[:8]})...")
        conn = psycopg.connect(db_url)
        cur = conn.cursor()
        
        # Manejo correcto de arreglos PostgreSQL
        target_states = data.target_states if data.target_states else None
        target_groups = data.target_groups if data.target_groups else None
        academic_levels = data.academic_levels
        
        # Corregir caso donde el LLM devuelve el string "null"
        call_date = None if str(data.call_date).lower().strip() == "null" else data.call_date
        deadline = None if str(data.deadline).lower().strip() == "null" else data.deadline
        
        # Determinar status basado en la fecha de cierre
        from datetime import datetime
        status = 'active'
        if deadline:
            try:
                deadline_date = datetime.strptime(deadline, '%Y-%m-%d')
                if deadline_date < datetime.now():
                    status = 'expired'
            except ValueError:
                pass # Si el formato es invalido, lo dejamos active y que filtre la query

        # Sentencia UPSERT (ON CONFLICT)
        query = """
            INSERT INTO scholarships (hash_id, title, institution_name, description, url, target_states, target_groups, academic_levels, call_date, deadline, status, embedding)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (hash_id) DO UPDATE SET 
                title = EXCLUDED.title,
                target_groups = EXCLUDED.target_groups,
                academic_levels = EXCLUDED.academic_levels,
                call_date = EXCLUDED.call_date,
                deadline = EXCLUDED.deadline,
                status = EXCLUDED.status,
                embedding = EXCLUDED.embedding,
                updated_at = NOW();
        """
        
        cur.execute(query, (
            hash_id, data.title, data.institution_name, data.description, url,
            target_states, target_groups, academic_levels, call_date, deadline, status, embedding_str
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Beca procesada exitosamente.")
        
    except Exception as e:
        print(f"❌ Error en base de datos: {e}")

# --- Flujo Principal ---
if __name__ == "__main__":
    import re
    # Leer URLs desde becas.md
    md_path = os.path.join(os.path.dirname(__file__), '..', 'Documentacion', 'becas.md')
    urls_to_scrape = []
    
    if os.path.exists(md_path):
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extraer posibles URLs ignorando caracteres de markdown como ), ], o >
        urls_raw = re.findall(r'https?://[^\s)\]>]+', content)
        urls_to_scrape = list(set(urls_raw)) # Eliminar duplicados exactos
    
    if not urls_to_scrape:
        print("🚧 No se encontraron URLs en Documentacion/becas.md. Usando URL de prueba.")
        urls_to_scrape = ["https://example.com/beca-ficticia"]

    print(f"🚀 Iniciando Pipeline de Extracción con {len(urls_to_scrape)} URLs...")
    
    import time
    
    for url in urls_to_scrape:
        try:
            print(f"Extrahendo y procesando: {url}")
            raw_text = extract_text_from_url(url)
            scholarship_data = parse_scholarship_text(raw_text)
            upsert_scholarship(scholarship_data, url)
            
            # Pausa de 4 segundos para evitar Rate Limits (15 RPM en Gemini Free Tier)
            time.sleep(4)
        except Exception as e:
            print(f"❌ Error procesando {url}: {e}")
            
    print("🏁 Fin de la ejecución del pipeline de extracción.")
