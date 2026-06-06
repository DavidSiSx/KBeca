# Sistema de Diseño KBeca: Editorial Brutalista Mexicano

Este documento define las bases del sistema de diseño visual de la plataforma KBeca, garantizando coherencia en la interfaz y una identidad sólida y única.

## 1. Filosofía y Estética

El diseño de KBeca adopta una estética **Editorial Brutalista Mexicana**. Se aleja de los diseños web genéricos (sombras difuminadas, degradados suaves, bordes muy redondeados) para apostar por:

- **Trazos fuertes:** Uso intensivo de bordes gruesos y negros (`#1c1c18`).
- **Sombras sólidas:** Sombras sin desenfoque (blur: 0px) que simulan bloques físicos.
- **Texturas vintage:** Uso de patrones como tramados (halftones) de estilo cómic clásico.
- **Identidad local moderna:** Colores extraídos del paisaje mexicano pero aplicados de manera vibrante, plana y geométrica, no folclórica tradicional.

## 2. Paleta de Colores

La paleta se divide en familias cromáticas específicas, configuradas en `globals.css` mediante Tailwind CSS v4.

### 🧱 Tierra / Ladrillo (Primarios)

- **Primary:** `#ac2d16` (Terracota sólido para CTAs y fondos importantes).
- **Primary Container:** `#ce452c`
- **Primary Fixed Dim:** `#ffb4a5` (Pastel suave).
- **On Primary:** `#ffffff`

### 🌾 Desierto / Sol (Secundarios)

- **Secondary:** `#865300` (Ocre tostado para acentos).
- **Secondary Container:** `#fcae48` (Ocre/Mostaza vibrante).
- **Secondary Fixed Dim:** `#ffb962` (Pastel cálido).

### 🌵 Vegetación (Terciarios)

- **Tertiary:** `#396632` (Verde Cactus para insignias de seguridad/éxito).
- **Tertiary Container:** `#518048`
- **Tertiary Fixed Dim:** `#a1d494` (Pastel botánico).

### 📜 Papel y Tinta (Superficies y Texto)

- **Background / Surface:** `#fcf9f2` (Crema claro, simula el color de la página).
- **Surface Variant:** `#e5e2db` (Crema oscurecido para tarjetas).
- **On Background / Foreground:** `#1c1c18` (Negro casi puro, usado para todo el texto principal y los bordes estructurales).

## 3. Tipografía

El contraste tipográfico es esencial para el "look" editorial:

- **Fuentes Display/Titulares (`font-display`, `font-headline`):** `Anybody` (o similar system-ui). Transmite impacto, peso y carácter de encabezado de periódico.
- **Fuentes de Cuerpo (`font-body`, `font-label`):** `DM Sans`. Limpia, altamente legible y neutra para compensar el peso de los titulares.

## 4. Componentes y Utilidades Clave

### Botones y Tarjetas

Deben sentirse físicos y planos.

- **Bordes:** `border-[3px]` o `border-2` usando `border-on-background`.
- **Interacciones Hover:** Efectos de desplazamiento sin transición suave o con salto repentino.
- **Clases custom (`globals.css`):**
  - `.hard-shadow-hover`: Genera una sombra brutalista dura (`box-shadow: 4px 4px 0px 0px #1c1c18`) al pasar el cursor.
  - `.hard-border`: Aplica el borde estándar brutalista.

### Ilustraciones y Fotografía

- **Estilo:** Ilustraciones vectoriales planas.
- **Personajes:** Geométricos, sin rostro definido, limpios.
- **Regla estricta:** NO usar fotografías de stock genéricas. Siempre que sea posible, usar ilustraciones que consuman los colores primarios, secundarios y terciarios definidos en la paleta.

## 5. Implementación en Código

Todos los desarrollos futuros de frontend o creaciones de nuevos agentes de IA deben consultar este documento y la configuración activa en `src/app/globals.css` para no romper la estética brutalista de la plataforma.
