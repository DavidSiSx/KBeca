# Registro de Errores de la IA (AI Error Log)

Este archivo documenta los errores cometidos por la IA durante el desarrollo para evitar repetirlos en el futuro.

## Error 1: Instalación de psycopg2-binary en Windows
- **Descripción:** Al intentar instalar `psycopg2-binary==2.9.9` mediante `pip` en el entorno virtual de Python bajo Windows, la instalación falló intentando compilar desde el código fuente (`pg_config executable not found`).
- **Causa:** Las ruedas precompiladas (wheels) de `psycopg2` a veces no coinciden con ciertas versiones de Python en Windows, forzando una compilación que requiere herramientas de PostgreSQL instaladas localmente.
- **Solución implementada:** Se migró a la versión moderna **Psycopg 3** (`psycopg[binary]`), la cual tiene mejor soporte de binarios precompilados y es el estándar actual. Se actualizó `requirements.txt` y se modificó `main.py` para usar `import psycopg` en lugar de `import psycopg2`.
- **Regla aprendida:** Para proyectos en Windows o entornos no controlados, priorizar siempre `psycopg[binary]` (v3) sobre el antiguo `psycopg2`.
