# KBeca - Guía y Reglas para Agentes de IA

Este documento sirve como contexto principal y conjunto de reglas estrictas para cualquier agente de IA (como yo) que trabaje en el código de **KBeca**.

## 🎯 Objetivo del Proyecto

KBeca es una plataforma de búsqueda y emparejamiento de becas en México, diseñada con una arquitectura extrema de **presupuesto $0 USD**, máxima velocidad y estricto cumplimiento de la ley de privacidad mexicana (LFPDPPP).

## 🛠️ Stack Tecnológico

- **Frontend / Fullstack:** Next.js 15 (React Server Components), TypeScript.
- **Base de Datos:** PostgreSQL (alojado en serverless/edge).
- **ORM:** Drizzle ORM (preferido por su soporte nativo para Arrays e índices GIN).
- **Estilos:** TailwindCSS (Diseño FSD, soporte para Dark Mode).
- **Ingesta de Datos (Scraper):** Python, Playwright, Instructor + Pydantic (con LLMs), GitHub Actions.
- **Infraestructura:** Vercel (Edge Functions, Middleware, Caching agresivo).

## 📜 Reglas Arquitectónicas Estrictas (¡Debe cumplirse siempre!)

### 1. Rendimiento y Costo Cero (Vercel)

- **Caché Agresivo:** Las consultas comunes (ej. `?estado=qroo&nivel=basica`) DEBEN ser cacheadas (Edge Cache / `unstable_cache` con revalidate) para evitar llamadas a la BD y mantener los costos de Vercel en $0.
- **RSC Primero:** Minimizar el JavaScript enviado al cliente usando React Server Components siempre que sea posible.

### 2. Motor de Emparejamiento (Matching Engine)

- **Arrays en PostgreSQL:** Las propiedades de las becas que aceptan múltiples valores (ej. `target_states`, `academic_levels`) DEBEN almacenarse como arreglos (`text[]`).
- **Índices GIN:** DEBE crearse explícitamente un índice `GIN` en las columnas de arreglos para búsquedas ultrarrápidas.
- **Ranking Score:** Las búsquedas no solo filtran, sino que ordenan. Se debe usar SQL crudo o las capacidades avanzadas de Drizzle para sumar coincidencias (ej. `(target_states @> ARRAY['...'])::int * peso`).

### 3. Privacidad por Diseño (Stateless Bunker)

- **Cero Cookies:** No implementar banners de cookies ni rastreadores intrusivos.
- **Datos Disociados:** NUNCA asociar edad, estado escolar o ubicación a una IP, sesión o nombre de usuario. Todo es anónimo y sin estado.
- **Telemetría Anónima:** Usar Vercel Web Analytics o Umami (sin cookies, hashes rotativos).

### 4. Accesibilidad (A11y) y UX ("Lenguaje Claro")

- **URL State Machine:** La UI DEBE reflejar exactamente los parámetros de la URL (Single Source of Truth). El estado no debe perderse al recargar la página.
- **Accesibilidad Estricta:** Uso obligatorio de `aria-label` en elementos interactivos sin texto y `aria-live="polite"` para actualizaciones dinámicas de resultados.
- **Lenguaje Claro:** Traducir lenguaje burocrático de gobierno a preguntas simples y empáticas para el usuario.

### 5. Ingesta Determinista (Scraper)

- **Cero Alucinaciones:** El LLM en el pipeline de Python actúa como un parser. DEBE usar Instructor + Pydantic con esquemas rígidos.
- **Idempotencia (Upsert):** Usar un hash SHA-256 (`url_oficial` + `titulo` + `organismo`) para evitar duplicados en la BD y actualizar convocatorias existentes si cambiaron. Esta es la llave única.
- **Resiliencia:** El scraper debe usar Circuit Breaker, Exponential Backoff y evitar detenciones completas por fallos en una URL.

### 6. Flujo de Trabajo y Buenas Prácticas del Agente IA

- **Uso de Skills:** Siempre que se trabaje en frontend o se analicen diseños, se DEBEN utilizar las skills específicas de diseño y frontend disponibles (ej. auditorías, revisión UX/UI).
- **Registro de Errores (aierror.md):** Si la IA comete un error durante el desarrollo, DEBE documentarlo en el archivo `aierror.md` detallando el error y la solución para no volver a cometerlo.
- **Seguridad y Testing:** Velar siempre por la seguridad del código. Al terminar cada fase de desarrollo, se deben instalar y realizar las pruebas correspondientes (tests unitarios/E2E).
- **Buenas Prácticas:** Escribir código limpio, modular, tipado (TypeScript) y seguir los principios Clean Code en todo momento.
- **Commits Modulares:** Cada git push debe estar lógicamente dividido. Está permitido generar mucho código de una vez, pero los commits deben seguir las categorías estrictas: `Feature`, `Bugfix`, `Refact`, `merge`, y `fix`.
- **Organización y Secretos:** Mantener una organización de carpetas TOTALMENTE ordenada (estándares de Open Source). Cualquier dato sensible (API Keys, contraseñas) que no sea colocado inmediatamente en el `.gitignore` ameritará una amonestación severa.
- **Diseño Mobile-First:** Todo el desarrollo de interfaz, maquetado y CSS DEBE seguir un enfoque estrictamente *Mobile-First*, asegurando rendimiento y usabilidad en dispositivos móviles antes de escalar a pantallas más grandes.
- No uses emojis
- No Pongas tu firma nunca`<!-- BEGIN:nextjs-agent-rules -->`
