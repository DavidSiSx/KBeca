# **Documento 1: Arquitectura Profunda y Estrategia de Datos**

Este documento aborda la visión estratégica del proyecto KBeca, detallando el diseño de la base de datos, el motor de emparejamiento matemático y la arquitectura de ingesta de datos bajo una restricción de presupuesto de $0 USD.

## **1\. Diseño Relacional Profundo: El Motor de Emparejamiento (Matching Engine)**

La decisión de usar matrices (Arrays) en PostgreSQL no es solo por conveniencia, es una estrategia de rendimiento extremo para entornos Serverless.

### **1.1 Modelado Matemático de la Consulta (Ranking Score)**

No basta con filtrar becas; el sistema debe ordenarlas por relevancia. Para esto, utilizaremos la capacidad de PostgreSQL para transformar booleanos en enteros y sumar coincidencias.

**Ejemplo de Consulta SQL Cruda (Concepto de Ponderación):**

Si un usuario busca: estado \= 'Quintana Roo', nivel \= 'Universidad', y programa \= 'Indígena'.

SELECT   
    id, title, target\_states, academic\_levels, social\_programs,  
    (  
        (target\_states @\> ARRAY\['Quintana Roo'\]::text\[\] OR target\_states IS NULL)::int \* 3 \+  
        (academic\_levels @\> ARRAY\['Universidad'\]::text\[\] OR academic\_levels IS NULL)::int \* 2 \+  
        (social\_programs && ARRAY\['Indígena'\]::text\[\])::int \* 2  
    ) AS match\_score  
FROM scholarships  
WHERE   
    status \= 'active' AND  
    (target\_states @\> ARRAY\['Quintana Roo'\]::text\[\] OR target\_states IS NULL) AND  
    (academic\_levels @\> ARRAY\['Universidad'\]::text\[\] OR academic\_levels IS NULL)  
ORDER BY match\_score DESC;

* **Explicación:** Se asignan "pesos" a las coincidencias. Que el estado coincida tiene un peso de 3, el nivel académico 2\. El uso de IS NULL permite que las becas "Nacionales" (que aplican a todos los estados) no sean excluidas en la fase WHERE.

### **1.2 Estructura de Índices GIN**

Para que la consulta anterior se ejecute en milisegundos, la creación del índice en Drizzle/SQL debe ser explícita:

CREATE INDEX idx\_scholarships\_states ON scholarships USING GIN (target\_states);  
CREATE INDEX idx\_scholarships\_levels ON scholarships USING GIN (academic\_levels);

## **2\. Ingeniería del Pipeline de Ingesta (El Scraper)**

El pipeline asíncrono debe ser resiliente, idempotente (no duplicar datos) y autónomo.

### **2.1 Flujo de Ejecución (GitHub Actions Cron Job)**

1. **Trigger:** Se ejecuta cada domingo a las 02:00 AM.  
2. **Scraping (Playwright):** Navega por sitios web objetivo (ej. CONAHCYT, SEV). Usa técnicas de evasión (playwright-stealth) para evitar ser bloqueado por Cloudflare.  
3. **Extracción del DOM:** Extrae únicamente el texto visible (innerText), ignorando scripts, estilos y menús de navegación para ahorrar tokens.  
4. **Inferencia (Instructor \+ LLM):** Pasa el texto crudo al LLM pidiendo el JSON.  
5. **Idempotencia (Upsert):** Antes de guardar en la BD, genera un hash SHA-256 basado en la URL original y el título. Si el hash ya existe, se hace un UPDATE (por si cambió la fecha límite), de lo contrario, un INSERT con estado pending.

### **2.2 Estrategia de Fallos (Resiliencia)**

* **Circuit Breaker:** Si la página de gobierno está caída (HTTP 500\) o bloqueada, el script anota el fallo en un log de GitHub Actions y continúa con la siguiente URL. No detiene la ejecución completa.  
* **Rate Limiting del LLM:** Se implementa un Tenacity (librería de Python) con *Exponential Backoff*. Si la API del LLM devuelve un error 429 (Too Many Requests), el script espera 2 segundos, luego 4, luego 8, antes de reintentar.