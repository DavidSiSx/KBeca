# **Documento 3: Casos de Uso, Legalidad, UX y Telemetría**

Este documento profundiza en la experiencia humana interactuando con el sistema, garantizando el cumplimiento normativo en México y la usabilidad extrema bajo condiciones tecnológicas adversas.

## **1\. Privacidad y Legalidad Expandida (LFPDPPP)**

### **1.1 El Estatus Legal de los "Datos Disociados"**

La arquitectura *Stateless* salva a KBeca de ser sujeto obligado ante el INAI. Según el Artículo 3, fracción VI de la LFPDPPP, los datos personales requieren hacer a una persona "identificada o identificable". Al capturar edad, estado y escolaridad sin asociarlos a una IP persistente, nombre, o sesión (cookies), KBeca opera bajo la figura de **datos disociados** (Artículo 3, fracción VIII).

* **Política de Cookies Cero:** No habrá banner de cookies molestos (Consent Banner). Al no usar Google Analytics tradicional ni píxeles de Meta, no hay rastreo entre sitios (Cross-site tracking).

### **1.2 Telemetría Preservadora de Privacidad**

Para saber si el proyecto tiene impacto, necesitamos métricas, pero sin violar la privacidad.

* **Solución:** Uso de **Vercel Web Analytics** (configurado en modo sin cookies) o un servidor auto-alojado de **Umami**. Estos sistemas utilizan hashes temporales del User-Agent rotativos que permiten saber que "hubo 100 búsquedas hoy en Quintana Roo" sin saber "quién" las hizo ni poder rastrearlos mañana.

## **2\. Accesibilidad Avanzada (A11y) y Experiencia de Usuario**

### **2.1 El Flujo de URL (State Machine)**

La interfaz debe reflejar exactamente lo que hay en la URL para evitar confusión (Single Source of Truth).

1. Usuario entra a kbeca.mx/. Selecciona "Quintana Roo" en la Radio Card y pulsa "Siguiente".  
2. Next.js hace un *push* silencioso a kbeca.mx/?step=2\&estado=qroo.  
3. Selecciona "Universidad". Next.js hace push a kbeca.mx/resultados?estado=qroo\&nivel=universidad.  
4. Si el usuario recarga la página, o envía ese link por WhatsApp, el componente servidor lee los parámetros e hidrata el estado visual exactamente donde lo dejó.

### **2.2 Soporte de Lectores de Pantalla (Screen Readers)**

Para personas con discapacidad visual severa (Arquetipo de Inclusión), el contraste no es suficiente. El marcado HTML debe ser semánticamente impecable.

* Uso estricto de etiquetas aria-label en componentes interactivos que no tienen texto visible directo.  
* Atributos aria-live="polite" en la sección de resultados. Cuando un usuario hace clic en "Filtrar" y la lista de becas cambia sin recargar la página, el lector de pantalla debe anunciar: "Se han encontrado 5 becas nuevas con tus criterios", para que el usuario ciego sepa que la acción tuvo éxito.

### **2.3 Patrones de Diseño "Plain Language" (Lenguaje Claro)**

Las convocatorias de gobierno están escritas en lenguaje burocrático (ej. "Requisitos de Elegibilidad Socioeconómica"). KBeca debe traducir esto en su interfaz (UI):

* **MAL:** "Seleccione su condición de vulnerabilidad."  
* **BIEN:** "¿Tienes alguna discapacidad, eres madre soltera o perteneces a un pueblo indígena?"  
* **MAL:** "Resultados no concluyentes para los parámetros ingresados."  
* **BIEN:** "No encontramos becas exactas para ti en este momento, pero revisa estas becas nacionales que le aplican a todos."