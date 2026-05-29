# **Documento 2: Stack Tecnológico, Reglas de IA y Código Base**

Este documento establece las normativas arquitectónicas para el código fuente y proporciona ejemplos de los esquemas que los agentes de IA deben respetar al generar componentes.

## **1\. Patrones Arquitectónicos Frontend (Next.js 15\)**

### **1.1 Caché Agresivo de Búsquedas Comunes**

Dado que Vercel cobra por tiempo de computo en Serverless Functions, debemos minimizar las consultas directas a la base de datos.

* **Estrategia:** Usar unstable\_cache o fetch memoizado para la función del motor de búsqueda.  
* **Ejemplo Práctico:** Si las becas se actualizan semanalmente, los resultados de la búsqueda ?estado=qroo\&nivel=basica pueden ser cacheados a nivel de red (Edge) por 24 horas (revalidate: 86400). Esto permite que picos virales de tráfico (ej. una escuela entera buscando al mismo tiempo) cuesten $0.

### **1.2 Implementación de Autenticación Edge (Admin)**

Para cumplir la regla de "Autenticación Búnker Stateless", el archivo middleware.ts en la raíz de Next.js interceptará la ruta /admin:

// middleware.ts (Concepto)  
import { NextResponse } from 'next/server';

export function middleware(req) {  
  const basicAuth \= req.headers.get('authorization');  
  const url \= req.nextUrl;

  if (url.pathname.startsWith('/admin')) {  
    if (basicAuth) {  
      const authValue \= basicAuth.split(' ')\[1\];  
      const \[user, pwd\] \= atob(authValue).split(':');  
      if (user \=== process.env.ADMIN\_USER && pwd \=== process.env.ADMIN\_PASS) {  
        return NextResponse.next();  
      }  
    }  
    return new NextResponse('Unauthorized', {  
      status: 401,  
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },  
    });  
  }  
}

## **2\. Determinismo del LLM: Pydantic \+ Instructor**

La regla "Traducción de Datos, no Alucinación" se aplica estrictamente en el backend de Python. El LLM actúa como un parser, no como un creador de contenido.

### **2.1 Esquema de Extracción (Ejemplo Pydantic)**

El prompt del sistema hacia Claude/OpenAI debe ir acompañado de este modelo rígido:

from pydantic import BaseModel, Field  
from typing import List, Optional

class ScholarshipExtraction(BaseModel):  
    title: str \= Field(description="Nombre oficial de la convocatoria.")  
    institution\_name: str \= Field(description="Entidad gubernamental o privada que la emite.")  
    target\_states: Optional\[List\[str\]\] \= Field(  
        description="Lista de estados exactos si es regional. Si dice 'Nacional' o 'Todo el país', retorna null."  
    )  
    academic\_levels: List\[str\] \= Field(  
        description="Debe ser estrictamente una lista con valores: 'Básica', 'Media Superior', 'Superior', 'Posgrado'."  
    )  
    deadline: Optional\[str\] \= Field(description="Fecha límite en formato YYYY-MM-DD. Null si no se especifica.")

* **Prompt del Sistema (System Prompt):** "Eres un analista legal rígido. Tu única tarea es leer texto de convocatorias de becas mexicanas y mapearlo al esquema JSON provisto. Si una información (como la edad o el estado) no se menciona explícitamente en el texto, DEBES retornar null. Bajo ninguna circunstancia debes inferir o inventar datos basados en el nombre de la institución."