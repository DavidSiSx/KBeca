# Roadmap - Proyecto KBeca

Este documento detalla los objetivos cumplidos y por cumplir en el ciclo de vida del desarrollo de KBeca. Se mantendrá actualizado a medida que cada fase se complete.

## Fase 0: Definición y Reglas (Completado)
- [x] Lectura de la Documentación (Casos de Uso, LFPDPPP, Arquitectura).
- [x] Establecimiento de reglas arquitectónicas de IA en `agent.md`.
- [x] Inclusión de normativas de Seguridad, Accesibilidad, Testing y Mobile-First.
- [x] Creación del Roadmap.

## Fase 1: Fundación y Base de Datos (Completado)
- [x] Inicialización del proyecto Next.js 15 (App Router, TypeScript).
- [x] Configuración del Linter, Prettier y dependencias base.
- [x] Inicialización del repositorio Git, creación del `.gitignore` estricto (protección de secretos).
- [x] Instalación de Drizzle ORM y configuración de la conexión a PostgreSQL.
- [x] Definición del Esquema de Base de Datos (`scholarships`) con Arrays e Índices GIN.
- [x] Configuración inicial del entorno de testing (Vitest / Playwright).
- [x] (Commit Modular): `Feature: Setup inicial del proyecto Next.js y esquema de BD`

## Fase 2: Motor de Ingesta y Seeder (Completado)
- [x] Creación de script `seed.ts` para popular la BD con datos de prueba realistas (Mock Data).
- [x] Setup de entorno Python (con uv/pip) para el scraper real.
- [x] Creación de script Playwright para extracción del DOM.
- [x] Integración de Instructor + Pydantic + LLM para parseo determinista.
- [x] Lógica de Idempotencia (Upsert) basada en Hash SHA-256.
- [x] Pruebas del scraper y manejo de fallos (Circuit Breaker).
- [x] (Commit Modular): `Feature: Pipeline de ingesta de datos y scraper resiliente`

## Fase 3: Arquitectura Frontend y Diseño UI
- [ ] Estructuración de carpetas siguiendo el patrón Feature-Sliced Design (FSD).
- [ ] Configuración de TailwindCSS (Tokens, Dark Mode persistente).
- [ ] Implementación de componentes primitivos (Botones, Formularios) bajo enfoque estrictamente Mobile-First.
- [ ] Auditoría inicial de Accesibilidad (A11y, aria-labels).
- [ ] (Commit Modular): `Feature: Implementación de sistema de diseño y componentes primitivos`

## Fase 4: Ensamblaje, Búsqueda y Optimización
- [ ] Construcción de la interfaz principal de búsqueda (State Machine basada en URL).
- [ ] Implementación de la consulta SQL cruda (Ranking Score ponderado) en Next.js.
- [ ] Integración de Middleware Edge para la protección del área de Admin.
- [ ] Estrategia de Edge Cache (`unstable_cache`) para las rutas públicas.
- [ ] Testing End-to-End de los flujos críticos.
- [ ] (Commit Modular): `Feature: Integración de búsqueda optimizada y caché perimetral`

---
*Cualquier error grave cometido durante el desarrollo se documentará en `aierror.md`.*
