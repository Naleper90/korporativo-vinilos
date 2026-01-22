# Fase 1 · Arquitectura CSS y comunicación visual

***

## 1.1 Principios de comunicación visual

En la pantalla inicial de Korporativo se aplican cinco principios básicos de comunicación visual: jerarquía, contraste, alineación, proximidad y repetición.

- **Jerarquía**
  La jerarquía se construye mediante distintos tamaños y pesos tipográficos. El logotipo "Korporativo" en el encabezado funciona como nivel superior, mientras que el título principal de la hero ("Calcula tus vinilos de manera fácil y rápida") destaca como mensaje clave del contenido. Bajo él, el párrafo descriptivo y el botón principal ordenan la lectura y conducen la mirada hacia la acción clave.

- **Contraste**
  El contraste se utiliza para resaltar los elementos más importantes. El encabezado negro con texto blanco se diferencia claramente del fondo claro del contenido, separando la navegación del área principal. Además, el botón de acción emplea un color de acento (verde lima) muy llamativo frente al resto de la interfaz para enfatizar la llamada a la acción.

- **Alineación**
  La alineación se basa en un contenedor central que limita el ancho máximo del contenido y lo mantiene equilibrado en pantalla. Dentro de la sección principal se utiliza un sistema de grid de dos columnas que alinea el bloque de texto de la hero y la zona de previsualización.

- **Proximidad**
  La proximidad se utiliza para agrupar elementos relacionados. El título principal, el párrafo descriptivo y los botones de acción se sitúan muy próximos dentro del mismo bloque de contenido, indicando que forman una unidad lógica.

- **Repetición**
  La repetición se aplica para mantener coherencia visual. Se reutiliza la misma familia tipográfica y escala consistente en encabezados, párrafos y componentes. Los colores de marca se repiten en header, contenido y elementos interactivos.

***

## 1.2 Metodología CSS

Para este proyecto se utiliza una adaptación de **BEM (Block, Element, Modifier)** integrada en la arquitectura de componentes de Angular y SCSS.

Cada componente de Angular encapsula sus estilos, pero internamente sigue la lógica BEM para sus clases:

- **Layout Principal:**
  - `.layout` → bloque principal
  - `.layout__header`, `.layout__main`, `.layout__footer` → elementos estructurales
  - `.layout__container` → contenedor reutilizable de ancho máximo

- **Sección Hero:**
  - `.hero` → bloque de la sección destacada
  - `.hero__content` → contenedor de texto y acciones
  - `.hero__title`, `.hero__subtitle` → elementos de texto
  - `.hero__preview` → contenedor de la imagen/preview

***

## 1.3 Organización de archivos (ITCSS)

La hoja de estilos global se organiza siguiendo la arquitectura **ITCSS** (Inverted Triangle CSS), separando responsabilidades desde lo más genérico a lo más específico:

- `src/styles/00-settings/` → **Settings**: Variables globales y tokens de diseño (`_variables.scss`).
- `src/styles/01-tools/` → **Tools**: Mixins y funciones reutilizables (`_mixins.scss`).
- `src/styles/02-generic/` → **Generic**: Reset CSS y normalización (`_reset.scss`).
- `src/styles/03-elements/` → **Elements**: Estilos base para etiquetas HTML puras (`_base.scss`).
- `src/styles/04-layout/` → **Layout**: Estructura de rejilla y contenedores mayores (`_layout.scss`, `_grid.scss`).
- `src/styles/05-components/` → **Components**: Estilos específicos de componentes UI (`_buttons.scss`, `theme.scss`).

Todos estos parciales se importan ordenadamente en el archivo principal `styles.scss` usando la regla `@use` de SASS.

***

## 1.4 Sistema de design tokens

### Colores
Los colores se definen como Custom Properties (variables CSS) para permitir el cambio de tema en tiempo real:

- **Primarios (Grises/Negros)**: `--color-primary-900` a `--color-primary-100`.
- **Acento (Acción)**: `--color-accent-500` (Verde lima).
- **Semánticos**: `--color-success-500`, `--color-error-500`, `--color-warning-500`.
- **Textos**: `--color-text-primary`, `--color-text-secondary`.

### Tipografía y Espaciado
- **Tipografía**: Familia principal `Roboto` / `system-ui`.
- **Escala Modular**: Desde `xs` (12px) hasta `3xl` (36px).
- **Espaciado**: Variables `--spacing-*` que aseguran consistencia en márgenes y paddings.

***

# Fase 2 · HTML semántico y estructura

***

## 2.1 Elementos semánticos utilizados

Se ha priorizado el uso de etiquetas semánticas de HTML5 para mejorar la accesibilidad y el SEO:

- **Estructura**: `<header>`, `<main>`, `<footer>` definen las regiones principales.
- **Contenido**: `<section>` para bloques temáticos (hero, features) y `<article>` para items independientes (cards, beneficios).
- **Navegación**: `<nav>` para el menú principal.
- **Formularios**: `<form>`, `<fieldset>`, `<legend>` y `<label>` asociado explícitamente a cada `<input>`.
- **Multimedia**: `<figure>` y `<picture>` para imágenes optimizadas.

***

## 2.2 Jerarquía de headings

La estructura de encabezados respeta el orden lógico:
1.  `<h1>`: Único por página, describe el contenido principal.
2.  `<h2>`: Títulos de secciones principales.
3.  `<h3>`: Subtítulos de tarjetas o bloques internos.

***

# Fase 3 · Sistema de componentes UI

***

## 3.1 Componentes implementados

El sistema de diseño se ha atomizado en componentes de Angular reutilizables:

### Botones (`<app-button>`)
Encapsula un botón nativo con variantes visuales controladas por `@Input() variant`:
- **Primary**: Fondo verde lima (acento).
- **Secondary**: Fondo oscuro / contraste.
- **Ghost**: Sin fondo, solo texto.
- **Danger**: Rojo semántico para borrado.

### Cards (`<app-card>`)
Componente flexible para mostrar contenido agrupado.
- Estructura interna: Cabecera (eyebrow, title), cuerpo (description) y pie (acciones).
- Elevación mediante sombras definidas en tokens.

### Inputs de Formulario (`<app-form-input>`)
Componente wrapper que incluye:
- `<label>` accesible.
- `<input>` o `<textarea>`.
- Mensajes de error y ayuda condicionales.
- Gestión de estados (focus, error, valid).

### Alertas (`<app-alert>`)
Bloques de feedback para el usuario.
- Variantes: Success, Error, Warning, Info.
- Iconografía y colores semánticos automáticos según la variante.

***

## 3.2 Nomenclatura y metodología

Se utiliza una convención híbrida donde el **Componente Angular** actúa como el "Bloque" BEM, y sus partes internas como "Elementos":

- **Bloque**: `app-card` (Host)
  - **Elemento**: `.card__header`
  - **Elemento**: `.card__title`
  - **Elemento**: `.card__footer`

Esto mantiene la modularidad de BEM aprovechando el encapsulamiento de estilos nativo de Angular.

***

## 3.3 Style Guide

Se ha implementado una página dedicada en `/style-guide` que actúa como documentación viva del sistema de diseño. Esta página muestra:

1.  **Atomos**: Paleta de colores completa y escala tipográfica real.
2.  **Componentes**: Todas las variantes de botones, inputs y alertas.
3.  **Comportamiento**: Demos de estados interactivos y autenticación.

Esta guía asegura que cualquier desarrollador pueda ver los componentes disponibles sin necesidad de navegar por toda la aplicación.

## 4.1 Estrategia Mobile First

El desarrollo de la interfaz ha seguido una estrategia **Mobile First**, definiendo primero los estilos base para dispositivos móviles y escalando progresivamente hacia pantallas más grandes mediante *Media Queries*.

- **Base (Móvil)**: Layouts en una sola columna (`flex-direction: column`), tipografías legibles y áreas de toque generosas (botones de altura mínima 44px).
- **Tablet (`md`: 768px)**: Introducción de grids de 2 columnas en secciones como "Beneficios" y ajustes de márgenes.
- **Escritorio (`lg`: 1024px +)**: Layouts complejos, navegación expandida en el header y uso de grids asimétricos para la sección Hero.

***

## 4.2 Breakpoints

Se han definido breakpoints estandarizados en las variables SASS (`00-settings/_variables.scss`) para mantener la consistencia en toda la aplicación:

- `$breakpoint-sm`: 640px
- `$breakpoint-md`: 768px (Tablet portrait)
- `$breakpoint-lg`: 1024px (Tablet landscape / Desktop pequeño)
- `$breakpoint-xl`: 1280px (Desktop estándar)

***

## 4.3 Técnicas de Layout (Flexbox y Grid)

Se combinan ambas tecnologías según el caso de uso:

- **CSS Grid Layout**: Utilizado en estructuras bidimensionales complejas, como la galería de productos o la parrilla de cards del dashboard. Permite reordenar elementos visualmente sin alterar el DOM.
- **Flexbox**: Utilizado para componentes unidimensionales, alineación de elementos en el header, botoneras y centrado de contenidos dentro de las cards.

El componente de navegación (`navbar`) cambia su comportamiento de una lista oculta (menú hamburguesa) en móvil a una lista horizontal visible (`display: flex`) en escritorio.

***

# Fase 5 · Multimedia optimizada

***

## 5.1 Formatos de nueva generación

Para mejorar el rendimiento de carga (LCP), se han sustituido los formatos tradicionales (JPG/PNG) por **WebP** en las imágenes principales.

- **WebP**: Formato principal por su superior relación calidad/compresión.
- **JPG**: Se mantiene como *fallback* para navegadores antiguos que no soporten WebP.
- **SVG**: Utilizado para el logotipo y los iconos de interfaz, garantizando nitidez en cualquier resolución sin peso extra.

***

## 5.2 Implementación técnica (`<picture>`)

Se utiliza la etiqueta `<picture>` para servir la imagen más adecuada según el soporte del navegador (Art Direction y cambio de formato):

```html
<picture>
  <source srcset="assets/images/hero-home.webp" type="image/webp">
  <source srcset="assets/images/hero-home.jpg" type="image/jpeg">
  <img 
    src="assets/images/hero-home.jpg" 
    alt="Descripción accesible del vinilo" 
    loading="lazy"
    width="800"
    height="600"
  >
</picture>
```

***

## 5.3 Optimización y Herramientas

Las imágenes han sido procesadas mediante **Squoosh.app**, reduciendo su peso significativamente (ej. reducción del 60% en la imagen Hero) sin pérdida perceptible de calidad visual.

Además, se aplica el atributo `loading="lazy"` en todas las imágenes que no están en el *viewport* inicial (below the fold) para ahorrar ancho de banda y acelerar la carga inicial.

***

# Fase 6 · Temas y modo oscuro

***

## 6.1 Arquitectura de variables CSS

El sistema de temas se basa en **CSS Custom Properties (Variables CSS)** definidas en `:root`. No se duplican hojas de estilo, sino que se reasignan los valores de las variables de color cuando cambia el atributo de tema.

```css
:root {
  /* Tema Claro (Default) */
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-surface: #f4f4f4;
}

[data-theme="dark"] {
  /* Tema Oscuro */
  --color-bg-primary: #121212;
  --color-text-primary: #e0e0e0;
  --color-surface: #1e1e1e;
}
```

Esto permite una transición instantánea sin recargas de página.

***

## 6.2 Persistencia y Detección

El servicio `ThemeService` de Angular gestiona la lógica del tema:

1.  **Detección automática**: Al cargar, comprueba si el usuario tiene preferencia de sistema (`prefers-color-scheme: dark`).
2.  **Persistencia**: Guarda la elección del usuario en `localStorage` para recordar el tema en futuras visitas.
3.  **Toggle**: Un interruptor en la interfaz permite alternar manualmente entre modos.

***

# Fase 7 · Aplicación completa y despliegue

***

## 7.1 Estado final de la aplicación

La aplicación **Korporativo Vinilos** se ha completado integrando todas las capas de desarrollo (DIW, DWEC, DWES) en una solución funcional.

### Páginas implementadas
- **Home**: Landing page con Hero, Beneficios y CTA.
- **Calculadora**: Cálculo reactivo de presupuestos según medidas y materiales.
- **Auth**: Login y Registro de usuarios contra backend Spring Boot.
- **Dashboard**: Gestión privada de presupuestos guardados.

***

## 7.2 Despliegue en Producción

La arquitectura de despliegue separa el Frontend del Backend para optimizar recursos y escalabilidad.

- **Frontend**: Desplegado en **Vercel** (SPA Angular).
- **Backend**: Desplegado en **Railway** (Docker Container con Spring Boot + MySQL).

### URL de Producción
La aplicación es accesible públicamente en:

👉 **[https://korporativo.vercel.app](https://korporativo.vercel.app)**

*Verificación:* La aplicación está operativa, con certificado SSL activo y comunicación funcional entre cliente y servidor.

***

## 7.3 Problemas conocidos y mejoras futuras

- **Mejora**: Implementar pasarela de pago (Stripe) para finalizar pedidos.
- **Mejora**: Añadir panel de administración para gestionar precios de materiales sin tocar la BD.
