# Registro de Errores IA (aierror.md)

## Error: Caída en métricas de Lighthouse (Performance 74) y Layout roto en Landing Page
**Fecha:** 2026-06-04
**Descripción del Error:** 
1. La puntuación de Lighthouse bajó a 74 debido a problemas de Performance (FCP, LCP, TBT). Esto se debió principalmente a enviar toda la carga de traducciones (`es.json`) al cliente a través de `NextIntlClientProvider` envolviendo todo el `layout.tsx`, resultando en un payload de red enorme.
2. La imagen del hero falló en renderizar (probablemente error de optimización de `next/image` sin configuración adecuada de formatos AVIF/WebP o corrupción de path).
3. El layout de la sección "Por qué KBeca" y el Footer se rompió (títulos apilados, elementos desalineados). Se utilizaron clases flexbox con `max-w-lg` que comprimieron el título, y posiblemente las variables de espaciado custom de Tailwind v4 (`--spacing-xl`, `--spacing-margin-mobile`) no fueron interpretadas correctamente en algunas utilidades, causando colapso de padding/margen.

**Solución Implementada:**
1. **Performance:** Eliminar `NextIntlClientProvider` del `layout.tsx` para que los React Server Components utilicen `useTranslations` (o `getTranslations`) directamente en el servidor y envíen 0 JavaScript de traducciones al cliente.
2. **Imágenes:** Añadir `formats: ['image/avif', 'image/webp']` en `next.config.ts` y usar `priority` adecuadamente.
3. **Layout:** Corregir las clases CSS en `page.tsx`. Usar `w-full` y `flex-1` para prevenir compresión de títulos, y asegurar que las variables de spacing están bien integradas. Ajustar el footer para un layout más robusto.

## Error: Uso de colores lavados (-container) en componentes de alto impacto (Brutalismo)
**Fecha:** 2026-06-06
**Descripción del Error:** 
Se utilizaron variantes de color diluidas (`bg-secondary-container`, `bg-primary-container`, `bg-tertiary-container`) en lugar de colores sólidos en iconos y tarjetas de beneficios. La estética "Editorial Brutalista" dictamina el uso de colores saturados puros y de alto impacto para botones, iconos e insignias, dejando los tonos lavados (pastel o container) EXCLUSIVAMENTE para grandes fondos de tarjetas ilustrativas o contenedores masivos, y nunca para elementos UI primarios.
**Solución a Implementar/Implementada:**
Revisar el uso de `*-container` en la base de código. Se reemplazaron las clases de iconos en `page.tsx` por `bg-primary`, `bg-secondary` y `bg-tertiary` (acompañadas de sus textos `text-on-*`). Queda pendiente auditar y corregir insignias en resultados y variables de botones para asegurar que mantengan la presencia brutalista.

## Error: Salto visual de color de fondo entre secciones continuas
**Fecha:** 2026-06-06
**Descripción del Error:** 
Se asignó un color de fondo diferente (`bg-surface-container-low`) a la nueva sección `PartnersMarquee`, rompiendo la continuidad visual con la sección superior ("Por qué KBeca" que usa `bg-background`). Esta es la segunda vez que ocurre una falta de estandarización en los fondos de las secciones principales de la landing page, creando cortes abruptos indeseados.
**Solución a Implementar/Implementada:**
Asegurarse de usar consistentemente `bg-background` en las secciones de la landing page que deban sentirse como parte del mismo bloque de lectura. Se actualizó `PartnersMarquee.tsx` para usar `bg-background`.
