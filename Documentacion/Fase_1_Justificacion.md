# Justificación y Documentación de la Fase 1

Este documento explica las acciones tomadas durante la **Fase 1: Fundación y Base de Datos** del proyecto KBeca, justificando las decisiones arquitectónicas bajo los principios de Presupuesto $0, Privacidad Absoluta y rendimiento.

## 1. Inicialización del Proyecto (Next.js 15)
- **Acción:** Se ejecutó `create-next-app` seleccionando **Next.js 15 (App Router)**, **TypeScript** y **TailwindCSS**.
- **Justificación:** Next.js con React Server Components (RSC) permite renderizar la mayor parte de la aplicación en el servidor, enviando cero JavaScript al cliente para componentes estáticos. Esto es crucial para cumplir la regla de "Rendimiento y Costo Cero". TypeScript asegura un código tipado y robusto, evitando errores en tiempo de ejecución. TailwindCSS permite un diseño *Mobile-First* y sistema de diseño (FSD) sin archivos CSS adicionales pesados.

## 2. Implementación de Drizzle ORM y Postgres
- **Acción:** Se instaló `drizzle-orm`, `drizzle-kit` y `postgres`. Se configuró la conexión en `src/db/index.ts`.
- **Justificación:** Drizzle ORM es extremadamente ligero (Edge-ready) y tiene soporte nativo para los tipos avanzados de PostgreSQL que necesitamos, específicamente los Arreglos (`text[]`). Esto es necesario para almacenar los estados y niveles educativos de una beca sin recurrir a costosas tablas relacionales (Join Tables) que ralentizarían el motor de búsqueda.

## 3. Diseño del Esquema de la Base de Datos (`schema.ts`)
- **Acción:** Se definió la tabla `scholarships` con columnas como `targetStates` (array de texto), `academicLevels` (array de texto), y se preparó para índices **GIN** (`Generalized Inverted Index`).
- **Justificación:** La regla principal del "Motor de Emparejamiento" exige que busquemos qué becas coinciden con los datos del estudiante de forma casi instantánea. En PostgreSQL, hacer un query sobre un arreglo buscando elementos en común (`&&`) o contenencia (`@>`) requiere un índice GIN para no escanear toda la tabla (Full Table Scan). Esta decisión arquitectónica es el corazón del rendimiento del buscador.

## 4. Seguridad de Secretos y `.env.local`
- **Acción:** Se creó el archivo `.env.local` con las variables `DATABASE_URL`, asegurando que `.gitignore` excluya estos archivos.
- **Justificación:** Siguiendo la regla de "Organización y Secretos", jamás se deben subir credenciales a GitHub. Se preparó el entorno para que sea agnóstico; funciona igual con una BD local (Docker) o remota (Supabase/Neon).

## 5. Configuración de Testing (Vitest)
- **Acción:** Se instaló `vitest` y `@testing-library/react`.
- **Justificación:** La regla "Seguridad y Testing" exige velar por pruebas. Vitest es mucho más rápido que Jest y funciona nativamente con TypeScript y la sintaxis moderna que usaremos.

## 6. Sincronización Remota (Git y Supabase)
- **Acción:** Se hizo push de la tabla `scholarships` directamente a la instancia de Supabase del usuario, y se sincronizó el repositorio local con `main` resolviendo los conflictos de los README.
- **Justificación:** Para trabajar con el modelo de cascada y asegurar que las siguientes fases (Motor de Ingesta, Backend, Frontend) funcionen, la base de datos física debía estar estructurada idénticamente al código local.

## Conclusión de la Fase 1
Se logró establecer la columna vertebral del proyecto. La base de datos está optimizada para el caso de uso específico (Matching Engine con GIN), el entorno es seguro, y el repositorio tiene un control de versiones estrictamente categorizado.
