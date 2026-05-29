# Justificación y Documentación de la Fase 2

Este documento explica las acciones tomadas durante la **Fase 2: Motor de Ingesta y Seeder** del proyecto KBeca, detallando cómo logramos tener un entorno listo para extraer y proporcionar datos sin comprometer la arquitectura.

## 1. Implementación del Mock Seeder (`seed.ts`)
- **Acción:** Se creó el archivo `src/db/seed.ts` utilizando la librería `@faker-js/faker` para generar 20 becas ficticias.
- **Justificación:** Para seguir un modelo de desarrollo en cascada, el backend (Fase 3) y el frontend (Fase 4) necesitan datos estructurados reales contra los cuales probar consultas SQL y la interfaz gráfica. Se generaron arreglos realistas (como `targetStates` y `academicLevels`) para probar el algoritmo de *matching* sin necesidad de extraer páginas gubernamentales manualmente.

## 2. Inserción de Datos y Reseteo Limpio
- **Acción:** Se conectó Drizzle al servidor de Supabase (configurado en `.env.local`) y se inyectaron los datos usando una rutina destructiva/constructiva (`await db.delete()`, luego `await db.insert()`).
- **Justificación:** Era imperativo confirmar que nuestra base de datos remota es funcional y acepta nuestros esquemas (como los tipos de Postgres Arrays) antes de empezar a escribir la lógica de negocio en la Fase 3.

## 3. Arquitectura del Scraper de Ingesta (Python)
- **Acción:** Se creó el directorio `scraper/` independiente del código frontend de Next.js, implementando un pipeline con **Playwright**, **Instructor (Pydantic)** y **Psycopg3**.
- **Justificación:**
  1. **Playwright (Headless):** Se utilizó para evadir medidas anti-bot rudimentarias en portales del gobierno y extraer el DOM renderizado, pero purgando activamente scripts y estilos para ahorrar consumo de tokens en llamadas a la API (alineado al "Presupuesto $0").
  2. **Instructor + Pydantic:** Se exige un parseo *determinista* sin alucinaciones. Instructor obliga al LLM a devolver un JSON estricto que mapea con nuestra estructura de base de datos.
  3. **Idempotencia (Upsert) con Hash:** Las páginas del gobierno cambian, así que generamos un Hash SHA-256 (`título + institución`). Usando el comando `ON CONFLICT DO UPDATE` de PostgreSQL logramos que el scraper pueda ejecutarse diariamente sin crear registros duplicados, solo actualizando los existentes.
  4. **Resiliencia:** Se implementó `tenacity` para usar estrategias de *Exponential Backoff* y *Circuit Breaker*, asegurando que el pipeline no colapse si un portal está caído.

## 4. Resolución de Dependencias en Windows
- **Acción:** Al detectar que el paquete `psycopg2-binary` fallaba compilando desde la fuente en Windows, se actualizó la dependencia a su versión moderna `psycopg[binary]` (Psycopg v3).
- **Justificación:** Documentamos este fallo en `aierror.md` para cumplir la regla del agente y se corrigió de inmediato en un commit de `Bugfix`. La arquitectura debe ser robusta en cualquier entorno de desarrollo (Linux/Windows) sin configuraciones pesadas.

## Conclusión de la Fase 2
La aplicación ya no es un cascarón; ahora la base de datos Supabase contiene 20 registros estructuralmente correctos listos para consumirse, y el motor de inyección asíncrono (Python) está ensamblado a la espera de sus llaves de API finales para producción.
