# QA Error Logging

## 2026-05-30T16:49:00Z
- **Componente:** `scraper/main.py` -> `src/db/schema.ts` (Neon Database)
- **Error:** `❌ Error en base de datos: expected 768 dimensions, not 3072` y posterior `PostgresError: column cannot have more than 2000 dimensions for hnsw index`
- **Causa Raíz:** El modelo `gemini-embedding-2` genera vectores de 3072 dimensiones por defecto. Al intentar actualizar PostgreSQL a `vector(3072)`, descubrimos que la extensión `pgvector` tiene un límite estricto de **2000 dimensiones** para índices HNSW (Hierarchical Navigable Small World), impidiendo su indexado para alta velocidad.
- **Plan de Resolución (Arquitectura Superior):** 
  En lugar de quitar el índice HNSW y degradar el rendimiento a "Sequential Scan", usaremos la capacidad de **aprendizaje de Matryoshka** de los modelos modernos de Gemini, forzando la reducción matemática a 768 dimensiones sin pérdida significativa de información.
  1. Revertir esquema de BD a `vector(768)`.
  2. En el Scraper (Python): `output_dimensionality=768`.
  3. En Next.js Backend (TS): `outputDimensionality: 768`.
  4. Ejecutar el scraper nuevamente.
