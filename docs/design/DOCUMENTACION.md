# Fase 1 · Arquitectura CSS y comunicación visual

---

## 1.1 Principios de comunicación visual

En la pantalla inicial de Korporativo se aplican cinco principios básicos de comunicación visual: jerarquía, contraste, alineación, proximidad y repetición.

- **Jerarquía**  
  La jerarquía se construye mediante distintos tamaños y pesos tipográficos. El logotipo "Korporativo" en el encabezado funciona como nivel superior, mientras que el título principal de la hero ("Calcula tus vinilos de manera fácil y rápida") destaca como mensaje clave del contenido. Bajo él, el párrafo descriptivo y el botón `btn btn--primary` ordenan la lectura y conducen la mirada hacia la acción principal.

- **Contraste**  
  El contraste se utiliza para resaltar los elementos más importantes. El encabezado negro con texto blanco se diferencia claramente del fondo claro del contenido, separando la navegación del área principal. Además, el botón `btn btn--primary` emplea un verde más llamativo que el resto de la interfaz para enfatizar la llamada a la acción.

- **Alineación**  
  La alineación se basa en un contenedor central que limita el ancho máximo del contenido y lo mantiene equilibrado en pantalla. Dentro de la sección principal se utiliza un sistema de grid de dos columnas que alinea el bloque de texto de la hero y la zona de previsualización.

- **Proximidad**  
  La proximidad se utiliza para agrupar elementos relacionados. El título principal, el párrafo descriptivo y el botón `btn btn--primary` se sitúan muy próximos dentro del mismo bloque de contenido.

- **Repetición**  
  La repetición se aplica para mantener coherencia visual. Se reutiliza la misma familia tipográfica y escala consistente en encabezados, párrafos y botones `btn`. Los colores de marca se repiten en header, contenido y botones.

---

## 1.2 Metodología CSS

Para este proyecto se utiliza BEM sobre arquitectura ITCSS.

En el layout principal se define el bloque `layout`:

- `.layout` → bloque principal
- `.layout__header`, `.layout__main`, `.layout__footer` → elementos del bloque
- `.layout__container` → contenedor reutilizable
- `.layout__nav`, `.layout__logo` → navegación y logotipo

En la sección principal el bloque `hero`:

- `.hero` → sección destacada
- `.hero__content` → agrupa título, subtítulo y botón
- `.hero__title`, `.hero__subtitle` → elementos de texto
- `.hero__preview` → previsualización

---

## 1.3 Organización de archivos (ITCSS)

La hoja de estilos global se organiza siguiendo ITCSS:

- `src/styles/00-settings/` → design tokens `_variables.scss`
- `src/styles/01-tools/` → mixins `_mixins.scss`
- `src/styles/02-generic/` → reset CSS `_reset.scss`
- `src/styles/03-elements/` → estilos base HTML
- `src/styles/04-layout/` → estructura de página `layout`
- `src/styles/05-components/` → componentes `btn`, `card`, `form-input`

---

## 1.4 Sistema de design tokens

### Colores
- **Primarios**: `--color-primary-500`
- **Neutrales**: `--color-neutral-500`
- **Semánticos**: `--color-success-400`, `--color-error-400`
- **Acción**: Verde para `btn--primary`

### Tipografía y espaciado
Escala definida en `_variables.scss` aplicada consistentemente.

### Breakpoints y otros tokens
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Sombras, bordes, radios, transiciones como variables.

---

## 1.5 Mixins y funciones

Mixins en `01-tools/_mixins.scss`:

- Mixin centrado Flexbox → usado en `hero`
- Mixin contenedores elevados → usado en `card`
- Mixins utilitarios para espaciados

.hero__preview {
@include card-elevated;
}

text

---

## 1.6 ViewEncapsulation en Angular

Estrategia `Emulated` por defecto. Estilos globales en `styles.scss` (ITCSS) + estilos encapsulados por componente.

# Fase 2 · HTML semántico y estructura

---

## 2.1 Elementos semánticos utilizados

- `<header>`, `<nav>` para navegación
- `<main>`, `<section>`, `<article>` para contenido
- `<aside>` para zonas secundarias
- `<footer>` para pie de página
- `<form class="contact-form">`, `<fieldset class="contact-form__fieldset">`, `<legend class="contact-form__legend">` para formularios
- `<label class="form-input__label">` asociado a `<input class="form-input__field">`

---

## 2.2 Jerarquía de headings

- `<h1>` único por página
- `<h2>` secciones principales
- `<h3>` subsecciones

---

## 2.3 Estructura de formularios

<form class="contact-form"> <fieldset class="contact-form__fieldset"> <legend class="contact-form__legend">Datos personales</legend> <div class="form-input"> <label class="form-input__label" for="nombre"> Nombre <span class="form-input__required">*</span> </label> <input class="form-input__field" id="nombre"> <p class="form-input__help">Máximo 50 caracteres</p> <p class="form-input__error">Campo obligatorio</p> </div> </fieldset> </form> ```
Fase 3 · Sistema de componentes UI
3.1 Componentes implementados
Botones (btn)

btn btn--primary, btn btn--secondary

btn--large, btn--medium

Estados: :hover, :focus-visible, :disabled

Cards (card)

text
<div class="card">
  <div class="card__header">
    <span class="card__eyebrow">Oferta especial</span>
    <h3 class="card__title">Vinilos personalizados</h3>
    <p class="card__description">15€/m²</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Solicitar</button>
  </div>
</div>
Formularios (form-input)

text
<div class="form-input">
  <label class="form-input__label">Nombre</label>
  <input class="form-input__field">
  <p class="form-input__help">Ayuda</p>
  <p class="form-input__error">Error</p>
</div>
Textarea: form-input__field--textarea

Alertas (alert)

alert alert--success

alert alert--error

alert alert--warning

alert alert--info

3.2 Nomenclatura y metodología
BEM (Block, Element, Modifier):

Bloques: btn, card, alert, form-input, contact-form

Elementos: card__eyebrow, card__title, form-input__label, form-input__field, contact-form__fieldset

Modificadores: btn--primary, alert--success, form-input__field--textarea

3.3 Style Guide
Página /style-guide con:

Botones: todas variantes btn--primary, btn--secondary, tamaños

Formularios: form-input, contact-form__fieldset

Alertas: alert--success, alert--error

Cards: card completa

text

***

## [CHECKLIST] Qué falta por hacer exactamente

- [ ] **Capturas Fase 1:** ITCSS + tokens
- [ ] **Capturas Fase 2:** HTML semántico + `contact-form__fieldset`
- [ ] **Capturas Fase 3:** `btn`, `card`, `form-input`, `alert`
- [ ] **Validar `/style-guide`**
- [⏳] **DWEC Bloque 1**

¿Listo para copiar o necesitas algún ajuste?
esos no son mis codigos, yo no tengo div. el markdown no se parece en nada a lo que te he pasado, solo habia que corregir nombres de componentes y eso
[CONTEXTO]
Estado actual: Fases 1-3 completas pero con nombres incorrectos.
Qué voy a corregir: SOLO nombres de clases por los reales del código (btn NO app-button, form-input__ NO app-form-input, alert--, contact-form__, card__).

[MARKDOWN COMPLETO] Corregido SOLO nombres
text
# Fase 1 · Arquitectura CSS y comunicación visual

---

## 1.1 Principios de comunicación visual

En la pantalla inicial de Korporativo se aplican cinco principios básicos de comunicación visual: jerarquía, contraste, alineación, proximidad y repetición.

- **Jerarquía**  
  La jerarquía se construye mediante distintos tamaños y pesos tipográficos. El logotipo "Korporativo" en el encabezado funciona como nivel superior, mientras que el título principal de la hero ("Calcula tus vinilos de manera fácil y rápida") destaca como mensaje clave del contenido. Bajo él, el párrafo descriptivo y el botón `btn btn--primary` ordenan la lectura y conducen la mirada hacia la acción principal.

- **Contraste**  
  El contraste se utiliza para resaltar los elementos más importantes. El encabezado negro con texto blanco se diferencia claramente del fondo claro del contenido, separando la navegación del área principal. Además, el botón `btn btn--primary` emplea un verde más llamativo que el resto de la interfaz para enfatizar la llamada a la acción frente al texto descriptivo y la zona de previsualización.

- **Alineación**  
  La alineación se basa en un contenedor central que limita el ancho máximo del contenido y lo mantiene equilibrado en pantalla. Dentro de la sección principal se utiliza un sistema de grid de dos columnas que alinea el bloque de texto de la hero y la zona de previsualización, creando una estructura ordenada y fácil de escanear.

- **Proximidad**  
  La proximidad se utiliza para agrupar elementos relacionados y facilitar la comprensión del mensaje. El título principal, el párrafo descriptivo y el botón `btn btn--primary` se sitúan muy próximos dentro del mismo bloque de contenido, indicando que forman parte de la misma acción. En cambio, la zona de previsualización se separa en la segunda columna del grid, reforzando que es un elemento complementario pero distinto.

- **Repetición**  
  La repetición se aplica para mantener coherencia visual en toda la interfaz. Se reutiliza la misma familia tipográfica y una escala consistente de tamaños en encabezados, párrafos y botones `btn`. Del mismo modo, los colores de marca (negro, blanco y verde de acción) se repiten en el header, el contenido principal y el botón, creando una identidad reconocible y unificada.

---

## 1.2 Metodología CSS

Para este proyecto se utiliza la metodología BEM (Block, Element, Modifier) aplicada sobre una arquitectura ITCSS. BEM facilita la lectura de las clases y evita conflictos de estilos cuando el proyecto crece.

En el layout principal se define el bloque `layout`, que representa la estructura global de la página:

- `.layout` → bloque principal que controla el alto de la página, el color de fondo y la disposición en columna.
- `.layout__header`, `.layout__main` y `.layout__footer` → elementos del bloque `layout` que representan las zonas de cabecera, contenido y pie de página.
- `.layout__container` → elemento reutilizable dentro del bloque `layout` que limita el ancho máximo del contenido y lo centra en pantalla.
- `.layout__nav` y `.layout__logo` → elementos que organizan la navegación y el logotipo dentro del encabezado.

Además del bloque `layout`, se utiliza la misma metodología en la sección principal de contenido mediante el bloque `hero`:

- `.hero` → bloque que define la sección destacada de la página, donde se presenta el mensaje principal y la acción de calcular vinilos.
- `.hero__content` → elemento que agrupa el texto del título, el subtítulo y el botón principal.
- `.hero__title` → elemento que aplica estilos específicos al encabezado de la sección hero.
- `.hero__subtitle` → elemento que define el estilo del texto descriptivo bajo el título.
- `.hero__preview` → elemento que representa la zona de previsualización, maquetada como una figura independiente dentro del grid.

De esta forma, cada bloque (`layout`, `hero`, `btn`) encapsula su estructura y sus estilos, manteniendo una nomenclatura clara y fácil de escalar.

---

## 1.3 Organización de archivos (ITCSS)

La hoja de estilos global se organiza siguiendo la metodología ITCSS, ordenando los archivos de menor a mayor especificidad. La estructura principal es:

- `src/styles/00-settings/` → Contiene los *design tokens* del proyecto en `_variables.scss` (colores, tipografía, espaciado, breakpoints, sombras, bordes y transiciones). Estos valores actúan como única fuente de verdad para todas las decisiones visuales.
- `src/styles/01-tools/` → Incluye utilidades como mixins y funciones en `_mixins.scss`, que permiten reutilizar patrones de layout y comportamiento (por ejemplo, centrados flex o tarjetas con sombra).
- `src/styles/02-generic/` → Define estilos genéricos y el reset CSS en `_reset.scss`, eliminando estilos por defecto del navegador y normalizando la base visual del proyecto.
- `src/styles/03-elements/` → Contiene los estilos base para elementos HTML sin clases (`body`, encabezados, párrafos, enlaces, listas, etc.), aplicando tipografía y colores a nivel global.
- `src/styles/04-layout/` → Agrupa los estilos relacionados con la estructura de página, como el bloque `layout`, el contenedor principal y el sistema de grid utilizado en la hero.
- `src/styles/05-components/` → Reserva para componentes visuales reutilizables, como botones o tarjetas, que se apoyan en los tokens definidos en `00-settings`.

Este orden garantiza que primero se cargan las decisiones globales (tokens y herramientas) y, sobre ellas, se construyen los estilos genéricos, la estructura de la página y, por último, los componentes específicos.


---

## 1.4 Sistema de design tokens

### Colores

Los colores del proyecto se declaran como variables en `00-settings/_variables.scss`, donde cada tono tiene un nombre descriptivo y un uso concreto. La paleta se organiza en cuatro grupos principales:

- **Colores primarios**  
  Representan la identidad de marca de Korporativo. Se utiliza un tono oscuro para encabezados y fondos de alto contraste, y variantes más claras para fondos suaves y áreas de contenido. Esto permite mantener una apariencia coherente en toda la interfaz.

- **Colores secundarios y neutrales**  
  Los colores secundarios sirven como apoyo para elementos menos destacados, mientras que la escala de grises se utiliza para textos, bordes y fondos neutros. Esta escala facilita crear diferentes niveles de énfasis sin recurrir siempre al color principal.

- **Colores semánticos**  
  Se definen colores específicos para estados de interfaz: éxito (success), error, advertencia (warning) e información (info). Estos colores se reservan para mensajes y estados del sistema, de forma que el usuario pueda reconocer rápidamente el tipo de feedback.

- **Color de acción principal**  
  El botón “Calcular ahora” utiliza un color verde de alta visibilidad definido como token específico de acción. Este color se reserva para CTAs principales, lo que ayuda a guiar la atención del usuario hacia las acciones más importantes.

### Tipografía

La tipografía también forma parte de los design tokens definidos en `00-settings/_variables.scss`. Se utiliza una familia principal para todo el producto con diferentes tamaños, pesos y alturas de línea:

- **Familia tipográfica principal**  
  Se ha elegido una fuente sin serif por su legibilidad en pantalla y coherencia con el diseño moderno de Korporativo. Esta familia se aplica a textos de navegación, encabezados y párrafos para mantener una identidad visual consistente.

- **Escala tipográfica**  
  Los tamaños se organizan en una escala jerárquica que diferencia claramente títulos, subtítulos y texto de cuerpo. Los encabezados de la hero y del layout utilizan tamaños mayores y pesos más fuertes, mientras que los párrafos emplean tamaños moderados y alturas de línea más generosas para mejorar la lectura.

- **Pesos y alturas de línea**  
  Se definen pesos específicos para títulos (por ejemplo, semibold o bold) y para texto de párrafo (regular), junto con line‑height ajustado para cada tipo de contenido. Esto permite controlar la densidad visual y mantener una lectura cómoda tanto en bloques cortos como en textos descriptivos más largos.

### Sistema de espaciado

El espaciado también se define como tokens en `00-settings/_variables.scss`, utilizando una escala basada en incrementos constantes. Cada valor se declara como una variable reutilizable que se aplica en márgenes y paddings:

- **Escala uniforme**  
  La escala de espaciado crece de forma progresiva (desde valores muy pequeños para separaciones internas hasta valores grandes para bloques y secciones). Esto permite mantener proporciones coherentes entre los distintos elementos de la interfaz.

- **Aplicación en layout y componentes**  
  Los espaciados más grandes se emplean para separar secciones principales, como la distancia entre el header y la hero, mientras que los valores intermedios se usan para el espacio entre títulos, textos y botones. Los valores más pequeños se reservan para detalles finos, como separaciones internas en contenedores o tarjetas.

- **Consistencia visual**  
  Al utilizar siempre esta misma escala en lugar de valores sueltos, se evita la aparición de “medidas aleatorias” y se consigue que la interfaz tenga un ritmo visual coherente de arriba a abajo.

### Breakpoints y otros tokens

Además de colores, tipografía y espaciado, el sistema de design tokens incluye breakpoints y propiedades visuales complementarias:

- **Breakpoints responsive**  
  Se definen puntos de corte genéricos para móvil, tablet y escritorio (sm, md, lg, xl) como variables en `_variables.scss`. En esta fase solo se documentan y preparan para su uso en las fases posteriores de maquetación responsive.
  
- **Sombras y elevación**  
  Las sombras se recogen como tokens con diferentes niveles de intensidad. Esto permite aplicar una profundidad coherente en elementos como la previsualización de la hero o futuras tarjetas, reforzando la jerarquía visual sin inventar valores nuevos en cada caso.

- **Bordes, radios y transiciones**  
  Los radios de borde y los grosores de línea se definen como variables que se reutilizan en botones, contenedores y elementos interactivos. Del mismo modo, las duraciones de transición estándar se almacenan como tokens para unificar la sensación de movimiento en hover y cambios de estado.

---

## 1.5 Mixins y funciones

El proyecto incluye varios mixins reutilizables definidos en `01-tools/_mixins.scss` para evitar repetir código y aplicar patrones de diseño de forma consistente.

- **Mixin de centrado con Flexbox**  
  Este mixin encapsula la configuración básica de Flexbox para centrar y distribuir elementos. Se utiliza, por ejemplo, en la sección `hero` para alinear el contenido y controlar el espacio entre columnas sin repetir propiedades como `display: flex`, `flex-direction` o `gap`.

- **Mixin para contenedores elevados**  
  Agrupa estilos comunes de tarjetas o bloques destacados, combinando fondo, sombra y radio de borde a partir de los tokens definidos en `00-settings`. Se aplica en elementos como la previsualización de la hero para dar sensación de profundidad y mantener una apariencia consistente.

- **Otros mixins utilitarios**  
  Además, se incluyen mixins auxiliares para patrones que se repiten a lo largo de la interfaz (por ejemplo, espaciados o ajustes visuales específicos). Estos mixins facilitan mantener el código más limpio y permiten ajustar estilos globales modificando un único punto.

---

## 1.6 ViewEncapsulation en Angular

En este proyecto se mantiene la estrategia de encapsulación por defecto de Angular (`Emulated`) en los componentes. Esta opción genera estilos aislados por componente, evitando que reglas internas se filtren de una vista a otra.

Al mismo tiempo, el sistema de diseño global se gestiona desde `src/styles/styles.scss`, donde se importan los archivos organizados con ITCSS. De esta forma, los componentes heredan la base tipográfica, la paleta de colores y el layout común, mientras que los estilos específicos se siguen encapsulando dentro de cada componente de Angular.

# Fase 2 · HTML semántico y estructura

---

## 2.1 Elementos semánticos utilizados

La estructura principal de Korporativo se apoya en elementos semánticos de HTML5 para describir cada zona de la aplicación sin recurrir a `div` genéricos.

El encabezado global se implementa con `<header>` e incluye el logotipo y la navegación principal dentro de `<nav>`, lo que facilita identificar el menú y el acceso a la home. El contenido principal de cada página se encapsula en `<main>`, garantizando que solo exista un bloque principal por vista.

Dentro de `<main>` se utilizan `<section>` para agrupar bloques de contenido relacionados (hero, listados, formularios) y `<article>` cuando se representan piezas de contenido independientes como cards o elementos de información destacada.

Para la navegación secundaria y zonas de apoyo, como posibles filtros o bloques laterales, se reserva `<aside>`, mientras que el pie de página se implementa con `<footer>` e incluye enlaces legales, redes sociales y copyright.

En los formularios se utiliza `<form>` como contenedor semántico, `<fieldset>` para agrupar campos relacionados y `<legend>` para describir el propósito de cada grupo (por ejemplo, “Envíanos tu mensaje” en el formulario de contacto). Cada control de formulario se acompaña de un `<label>` asociado mediante los atributos `for` e `id`.

Aquí se incluirán capturas de pantalla señalando los elementos semánticos en la estructura de la página.

---

## 2.2 Jerarquía de headings

La jerarquía de títulos sigue una estructura estricta para mantener la accesibilidad y la coherencia visual.

Cada página define un único `<h1>` que representa el título principal de la vista. A partir de él se utilizan `<h2>` para secciones principales como “Style Guide”, “Campos de formulario” o “Alertas”, y `<h3>` para subtítulos específicos dentro de cada sección (por ejemplo, grupos de componentes dentro del style guide).

No se saltan niveles (no se pasa de `h1` a `h3` directamente), de modo que la estructura de headings coincide con la estructura lógica de secciones y subsecciones de la página.

Esta jerarquía facilita que los usuarios que navegan con teclado o lector de pantalla puedan saltar entre títulos de forma ordenada y entender la estructura del contenido sin ver el diseño.

En la documentación se añadirá un diagrama de niveles donde se muestra cómo el `h1` de la página engloba a los distintos `h2` de secciones y, dentro de ellos, a los `h3` de subsecciones.

---

## 2.3 Estructura de formularios

El formulario principal del proyecto (formulario de contacto) se estructura con un `<form class="contact-form">` que engloba todos los campos relacionados con el envío de un mensaje.

Dentro del formulario se utiliza un `<fieldset class="contact-form__fieldset">` para agrupar los campos de datos personales y de mensaje, acompañado de un `<legend class="contact-form__legend">` que actúa como título semántico del grupo y explica el propósito del formulario.

Cada campo se construye mediante el patrón `form-input`, que genera internamente un `<label class="form-input__label">` asociado a un `<input class="form-input__field">` o `<textarea class="form-input__field form-input__field--textarea">` a través de los atributos `for` e `id`.

Además de los campos de texto, el proyecto incluye componentes específicos para `<textarea>` y `<select>` (`app-form-textarea` y `app-form-select`), que siguen la misma estructura semántica: siempre hay un `<label>` descriptivo, un control de formulario con `name` e `id`, un indicador visual de campo obligatorio (asterisco) y, cuando es necesario, un texto de ayuda y un mensaje de error.

El uso de `<fieldset>` y `<legend>` permite agrupar también opciones adicionales, como checkboxes para extras o selección de país, manteniendo la relación semántica entre campos.

En esta sección se añadirán capturas de pantalla del formulario de contacto donde se vean claramente `<form>`, `<fieldset>`, `<legend>` y la asociación entre `label` e `input`.


# Fase 3 · Sistema de componentes UI

---

## 3.1 Componentes implementados

En esta fase se ha construido un sistema de componentes UI reutilizables, cada uno con variantes, tamaños y estados definidos.

- **Botones (`btn`)**  
  El componente genera un `<button>` con la clase base `btn` y añade modificadores de variante y tamaño. Se usa para todas las acciones principales y secundarias de la interfaz.  

  - **Clases base y tamaños**  
    - `btn` → estilo base del botón (tipografía, borde, transición y cursor).  
    - `btn--sm` → botón compacto, usado para acciones secundarias o layouts más densos.  
    - `btn--md` → tamaño por defecto utilizado en la mayoría de la interfaz.  
    - `btn--lg` → botón más grande para CTAs destacadas, como el botón de envío del formulario de contacto.  

  - **Variantes**  
    - `btn--primary` → acción principal, con fondo `var(--color-primary-500)` y texto oscuro.  
    - `btn--secondary` → botón oscuro sobre fondo claro (`var(--color-neutral-500)` con texto blanco).  
    - `btn--ghost` → fondo transparente, borde y texto en `var(--color-neutral-900)`.  
    - `btn--danger` → acciones destructivas, con fondo `var(--color-error-500)` y texto blanco.  

  - **Estados**  
    - `btn:hover:not(:disabled)` → aplica un ligero `filter: brightness(0.95)` para indicar interactividad.  
    - `btn:focus-visible` → muestra un `outline` de 2px usando `var(--color-primary-500)`.  
    - `btn:disabled` → reduce la opacidad y cambia el cursor a `not-allowed`.

- **Cards (`card`)**  
  Las cards se utilizan para presentar bloques de información con `card__eyebrow`, `card__title`, `card__description`.  

  - **Variantes**  
    - Card básica con `card__header`, `card__eyebrow`, `card__title`, `card__description`, `card__footer`.  
    - La estructura permite extender a futuras variantes manteniendo la misma base visual.  

  - **Estados**  
    - Estado normal con sombra y borde definidos por los tokens de elevación.  
    - Estado `:hover` con incremento de sombra y transición suave.

- **Campos de formulario (`form-input`)**  
  Estos componentes unifican la apariencia de todos los campos de formulario.  

  - **Variantes**  
    - `form-input` → entradas de texto con `form-input__field`.  
    - `form-input__field--textarea` → mensajes largos en varias líneas.  
    - `form-input__label`, `form-input__required`, `form-input__help`, `form-input__error`.  

  - **Estados**  
    - Campo normal.  
    - Campo requerido con asterisco `form-input__required`.  
    - Texto de ayuda `form-input__help`.  
    - Mensajes de error `form-input__error`.

- **Alertas (`alert`)**  
  Las alertas muestran mensajes de feedback al usuario según su contexto.  

  - **Variantes**  
    - `alert--success` → confirmaciones y operaciones correctas.  
    - `alert--error` → errores en formularios o procesos.  
    - `alert--warning` → advertencias antes de acciones importantes.  
    - `alert--info` → información general o avisos.  

  Cada variante aplica colores semánticos coherentes con los design tokens.

- **Componentes de layout (`layout`)**  
  Estos componentes definen la estructura global reutilizable.  

  - `layout__header` usa `<header>` con `layout__nav`, `layout__logo`.  
  - `layout__main` envuelve el contenido principal.  
  - `layout__footer` usa `<footer>`.

En la documentación se añadirán capturas de `/style-guide` mostrando cada componente.

---

## 3.2 Nomenclatura y metodología

Todos los componentes UI siguen BEM dentro de ITCSS.

- **Bloques**: `btn`, `card`, `alert`, `form-input`, `contact-form`.  
- **Elementos**: `card__eyebrow`, `form-input__label`, `form-input__field`, `contact-form__fieldset`.  
- **Modificadores**: `btn--primary`, `alert--success`, `form-input__field--textarea`.

En botones: `btn` + `btn--primary btn--lg`.  
En alertas: `alert` + `alert--success`.

---

## 3.3 Style Guide

Página `/style-guide` con:

- **Botones** → todas variantes `btn--primary`, tamaños `btn--sm/md/lg`.  
- **Campos de formulario** → `form-input`, `form-input__field--textarea`.  
- **Formulario de contacto** → `contact-form__fieldset`.  
- **Alertas** → `alert--success`, `alert--error`.  
- **Cards** → `card` con `card__eyebrow`, `card__title`.

La Style Guide permite comprobar que todos los componentes comparten la misma paleta de colores, tipografía, espaciado y comportamiento en los distintos estados. Además, sirve como referencia para futuras ampliaciones: cualquier nuevo componente UI deberá añadirse a esta página para quedar documentado visualmente.

En esta sección se añadirán capturas de la página `/style-guide`, señalando cada bloque de componentes y sus variantes.
