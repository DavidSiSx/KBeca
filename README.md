# KBeca

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?logo=postgresql&logoColor=white)](https://supabase.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Plataforma Inteligente de Búsqueda y Emparejamiento de Becas en México.**

KBeca es una solución tecnológica diseñada para democratizar el acceso a la educación mediante la centralización y estructuración de convocatorias de becas en todo el territorio mexicano. Desarrollada con un enfoque estricto en rendimiento (costo $0), usabilidad (*Mobile-First*), accesibilidad y privacidad total.

## Características Principales

*   **Motor de Emparejamiento (Matching Engine):** Filtrado ultrarrápido usando PostgreSQL (con arreglos nativos e índices GIN). Las búsquedas tienen en cuenta estado, nivel académico, género, edad, y características sociodemográficas.
*   **Ingesta Automatizada con IA:** Incluye un Scraper automatizado impulsado por Python, Playwright y Google GenAI (Gemini) que lee convocatorias no estructuradas de sitios gubernamentales y las convierte en JSON estandarizado para la base de datos.
*   **Diseño FSD & UI Premium:** Arquitectura Frontend estructurada bajo el estándar *Feature-Sliced Design (FSD)*. Interfaz responsiva, animaciones fluidas (Framer Motion) y Dark Mode 100% soportado.
*   **Privacidad por Diseño ("Stateless Bunker"):** Cero cookies intrusivas, cero almacenamiento de IP ligado a perfiles. Cumplimiento absoluto de la LFPDPPP.
*   **Rendimiento Extremo (Lighthouse 100):** Carga inicial rápida con *React Server Components* y cache agresivo en Vercel Edge.

## Stack Tecnológico

*   **Frontend:** Next.js 15 (App Router, RSC), React 19, TypeScript
*   **Estilos:** TailwindCSS v4, Material Symbols, Framer Motion
*   **Base de Datos:** PostgreSQL alojado en Supabase
*   **ORM:** Drizzle ORM
*   **Pipeline de Ingesta (Scraper):** Python 3.12, Playwright, Instructor + Pydantic, LLMs (Gemini API)
*   **Infraestructura:** Vercel

## Configuración Local

### Prerrequisitos
*   Node.js >= 20.x
*   Python >= 3.10 (Para correr el scraper)
*   Una base de datos PostgreSQL

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/DavidSiSx/KBeca.git
   cd KBeca
   ```

2. **Instalar dependencias del Frontend**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**
   Copia el archivo de ejemplo y completa tus credenciales (Supabase, Gemini, etc.):
   ```bash
   cp .env.example .env.local
   ```

4. **Sincronizar la Base de Datos (Drizzle)**
   ```bash
   npm run db:generate
   ```

5. **Iniciar el Servidor de Desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## Uso del Scraper (Ingesta de Datos)

El pipeline de ingesta automatizado escanea sitios oficiales, lee las convocatorias y actualiza (Upsert) la base de datos.

```bash
cd scraper
# Crear entorno virtual e instalar dependencias
python -m venv .venv
source .venv/bin/activate # En Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Ejecutar pipeline
python main.py
```

## Reglas de Contribución y Estilo

Este repositorio mantiene estándares estrictos:
- **Clean Code & FSD:** Separación de UI, features y compartidos (`src/app`, `src/features`, `src/shared`).
- **Commits Convencionales:** Obligatorio prefijar commits (`feat:`, `fix:`, `refact:`).
- **A11y:** Soporte total de teclado, atributos ARIA, y contraste validado en diseño.

## Licencia

[MIT License](LICENSE)
