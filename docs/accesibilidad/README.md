# Proyecto Órbita 4: Diseñar para todos
## Análisis y Documentación de Accesibilidad Web

---

## 1. Fundamentos de accesibilidad

### ¿Por qué es necesaria la accesibilidad web?

La accesibilidad web es fundamental para garantizar que todas las personas, independientemente de sus capacidades físicas, cognitivas o tecnológicas, puedan acceder, navegar y comprender el contenido digital. Esto incluye a usuarios con discapacidades visuales, auditivas, motoras o cognitivas, pero también beneficia a personas mayores, usuarios con conexiones lentas o dispositivos antiguos, y situaciones temporales como lesiones o entornos ruidosos. Una web accesible no es solo un imperativo ético y legal, sino también una mejor experiencia de usuario para todos.

### Tipos de discapacidades contempladas

- **Visual:** Ceguera, baja visión, daltonismo. *Requiere textos alternativos, contraste adecuado y compatibilidad con lectores de pantalla.*
- **Auditiva:** Sordera o hipoacusia. *Requiere subtítulos, transcripciones y alternativas visuales al audio.*
- **Motora:** Dificultad para usar el ratón o teclado. *Requiere navegación por teclado, áreas de clic grandes y tiempos de respuesta flexibles.*
- **Cognitiva:** Dislexia, TDAH, trastornos del espectro autista. *Requiere lenguaje claro, estructura predecible y reducción de distracciones.*

### Principios WCAG 2.1

Las **Web Content Accessibility Guidelines (WCAG) 2.1** se estructuran en cuatro principios fundamentales, conocidos como **POUR**:

#### 1. Perceptible
*El contenido debe poder ser percibido por todos los usuarios.*

**Ejemplo en el proyecto:**
- Todas las imágenes del carrusel tienen atributos `alt` descriptivos: `<img src="proyecto-1.jpeg" alt="Vinilo corporativo instalado en fachada comercial">`.
- Contraste de color adecuado entre texto y fondo (mínimo 4.5:1 para texto normal).

#### 2. Operable
*Los usuarios deben poder interactuar con la interfaz.*

**Ejemplo en el proyecto:**
- El carrusel CSS es completamente navegable con teclado usando `<input type="radio">` y `<label>`, sin depender de JavaScript.
- El menú hamburguesa se puede abrir/cerrar con tabulador y Enter.

#### 3. Comprensible
*La información y el funcionamiento deben ser claros.*

**Ejemplo en el proyecto:**
- Los formularios tienen `<label>` asociados correctamente con sus `<input>`: `<label for="nombre">Nombre</label>`.
- Mensajes de error claros en validaciones: "El campo email debe tener un formato válido".

#### 4. Robusto
*El contenido debe ser compatible con tecnologías actuales y futuras.*

**Ejemplo en el proyecto:**
- HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`).
- Compatibilidad con lectores de pantalla mediante ARIA cuando es necesario: `aria-label`, `aria-labelledby`, `aria-live`.

### Niveles de conformidad WCAG

- **Nivel A (Básico):** Cumplimiento mínimo. Sin él, algunos usuarios no podrán acceder al contenido.
- **Nivel AA (Medio):** Estándar recomendado para sitios públicos y comerciales. Elimina las barreras más significativas.
- **Nivel AAA (Avanzado):** Máxima accesibilidad. Difícil de alcanzar en todos los contenidos, pero deseable en servicios esenciales.

**Objetivo del proyecto:** Alcanzar el **Nivel AA** de conformidad WCAG 2.1.

---

## 2. Componente multimedia accesible

### Tipo de componente
**Carrusel de imágenes** (slideshow CSS puro sin JavaScript)

### Descripción
El carrusel muestra 5 proyectos realizados por Korporativo Vinilos en un slideshow navegable. Los usuarios pueden avanzar/retroceder entre imágenes usando botones de navegación o indicadores (dots), y el contador muestra en qué imagen se encuentran (ej. "3 de 5").

### Ubicación
- **Página:** Home (`/`)
- **Componente:** `frontend/src/app/pages/home/home.html`
- **Estilos:** `frontend/src/app/pages/home/home.scss`

### Características de accesibilidad implementadas

#### ✅ 1. HTML semántico y estructura
```html
<section class="carousel" aria-labelledby="carousel-title">
  <h2 id="carousel-title" class="carousel__title">Proyectos Korporativo</h2>
  <input type="radio" name="carousel-slide" id="slide-1" checked aria-label="Mostrar imagen 1">
  <!-- ... -->
  <ul class="carousel__track">
    <li class="carousel__slide">
      <figure class="carousel__figure">
        <img class="carousel__img" 
             src="assets/images/gallery/proyecto-1.jpeg" 
             alt="Vinilo corporativo instalado en fachada comercial"
             loading="lazy"
             width="800"
             height="450">
      </figure>
    </li>
  </ul>
</section>
```

**Elementos clave:**
- `<section>` con `aria-labelledby` para identificar la región del carrusel.
- `<h2>` con `id` para etiquetar semánticamente la sección.
- `<ul>` y `<li>` para estructurar la lista de imágenes.
- `<figure>` para asociar cada imagen con su contexto.

#### ✅ 2. Navegación por teclado (sin JavaScript)
- Implementado con `<input type="radio">` ocultos visualmente pero accesibles al teclador.
- Los `<label>` actúan como botones de navegación y se pueden activar con `Tab` + `Enter` / `Space`.
- El estado del carrusel se gestiona con CSS usando el selector `:checked`.

**Ventaja:** Funciona incluso si JavaScript está deshabilitado.

#### ✅ 3. Textos alternativos descriptivos
Todas las imágenes tienen atributos `alt` específicos que describen el contenido:
- ✅ "Vinilo corporativo instalado en fachada comercial"
- ✅ "Rotulación de vehículo con diseño personalizado"
- ✅ "Decoración interior con vinilo de gran formato"
- ✅ "Señalética corporativa en cristal con efecto esmerilado"
- ✅ "Display promocional con impresión fotográfica de alta calidad"

**Evita:** Textos genéricos como "imagen1" o "foto".

#### ✅ 4. ARIA para indicadores y contador
```html
<div class="carousel__indicators" role="tablist" aria-label="Indicadores de imagen">
  <label for="slide-1" class="carousel__indicator"></label>
  <!-- ... -->
</div>

<div class="carousel__counter" aria-live="polite">
  <span class="carousel__counter-text"></span>
</div>
```

- `role="tablist"` identifica los indicadores como pestañas.
- `aria-live="polite"` anuncia al lector de pantalla el cambio de slide sin interrumpir.

#### ✅ 5. Lazy loading y optimización
- `loading="lazy"` en todas las imágenes para carga diferida.
- Atributos `width` y `height` explícitos para evitar *Cumulative Layout Shift* (CLS).

#### ✅ 6. Responsive y touch-friendly
- Botones de navegación con `min-width: 44px` y `min-height: 44px` (tamaño mínimo táctil recomendado).
- Indicadores (dots) con área clicable amplia (`width: 12px`, `height: 12px` + padding).

### Código fuente
El código completo del carrusel se encuentra en:
- HTML: `frontend/src/app/pages/home/home.html` (líneas 64-146)
- CSS: `frontend/src/app/pages/home/home.scss` (líneas 215-445)

---

## 3. Auditoría inicial con herramientas automáticas

### 3.1. Lighthouse (Google Chrome DevTools)

**Herramienta:** Lighthouse integrado en Chrome DevTools  
**Fecha de análisis:** 5 de febrero de 2026  
**URL analizada:** `https://korporativo.vercel.app` (producción)

#### Resultados iniciales

| Categoría | Puntuación | Estado |
|-----------|------------|--------|
| Performance | 89/100 | 🟢 Bueno |
| Accessibility | 93/100 | 🟢 Excelente |
| Best Practices | 100/100 | 🟢 Perfecto |
| SEO | 83/100 | 🟢 Bueno |

**Captura de pantalla:** `capturas/lighthouse-antes.png`

#### Principales hallazgos

**Puntos fuertes detectados:**
- ✅ HTML semántico correctamente implementado
- ✅ Uso apropiado de ARIA attributes
- ✅ Contraste de colores adecuado
- ✅ Imágenes con textos alternativos

**Áreas de mejora identificadas:**
- ⚠️ Algunos elementos podrían mejorar su etiquetado (93/100 → margen de mejora de 7 puntos)
- ⚠️ Posibles problemas menores de accesibilidad a investigar y corregir

**Conclusión inicial:** Base sólida de accesibilidad (93/100), pero con margen de mejora para alcanzar la puntuación perfecta.

---

## 4. Errores detectados y correcciones aplicadas

A continuación se detallan los 5 errores de accesibilidad identificados y corregidos en el proyecto.

### Error 1: Idioma de la página incorrecto

**Criterio WCAG incumplido:** 3.1.1 Idioma de la página - Nivel A

**Descripción del problema:**
El atributo `lang` del elemento `<html>` estaba configurado con el valor `"en"` (inglés) cuando todo el contenido de la aplicación está en español.

**Ubicación:**
- Archivo: `frontend/src/index.html`
- Línea: 2

**Código antes:**
```html
<html lang="en">
```

**Código después:**
```html
<html lang="es">
```

**Impacto:** Alto - Los lectores de pantalla pronuncian el contenido con la voz incorrecta.

---

### Error 2: Botones sin atributo `type` explícito

**Criterio WCAG incumplido:** 4.1.2 Nombre, función, valor - Nivel A

**Descripción del problema:**
Dos botones en el componente `header.html` no tenían el atributo `type="button"` explícito, lo que puede causar comportamientos inesperados en formularios.

**Ubicación:**
- Archivo: `frontend/src/app/components/layout/header/header.html`
- Líneas: 45, 89

**Código antes:**
```html
<button (click)="toggleTheme()" aria-label="Cambiar tema">
  <!-- Icono -->
</button>

<button (click)="logout()" class="header__auth-link">
  Cerrar sesión
</button>
```

**Código después:**
```html
<button type="button" (click)="toggleTheme()" aria-label="Cambiar tema">
  <!-- Icono -->
</button>

<button type="button" (click)="logout()" class="header__auth-link">
  Cerrar sesión
</button>
```

**Impacto:** Medio - Puede provocar envíos de formulario no deseados.

---

### Error 3: Botón de cerrar toast sin etiqueta accesible

**Criterio WCAG incumplido:** 4.1.2 Nombre, función, valor - Nivel A

**Descripción del problema:**
El botón de cerrar en el componente de notificaciones (toast) solo contenía el símbolo "×" sin una etiqueta accesible para lectores de pantalla.

**Ubicación:**
- Archivo: `frontend/src/app/components/shared/toast/toast.html`
- Línea: 8

**Código antes:**
```html
<button (click)="close()">×</button>
```

**Código después:**
```html
<button type="button" (click)="close()" aria-label="Cerrar notificación">
  <span aria-hidden="true">×</span>
</button>
```

**Impacto:** Alto - Los usuarios de lectores de pantalla no saben qué hace el botón.

---

### Error 4: Eliminación del indicador de foco en inputs

**Criterio WCAG incumplido:** 2.4.7 Foco visible - Nivel AA

**Descripción del problema:**
Se aplicó `outline: none` a los campos de entrada al recibir foco, eliminando el indicador visual de navegación por teclado.

**Ubicación:**
- Archivos afectados:
  - `frontend/src/app/pages/calculator/calculator.scss`
  - `frontend/src/app/components/shared/login-form/login-form.scss`
  - `frontend/src/styles/05-components/_budgets.scss`

**Código antes:**
```scss
.calculator-input-field:focus {
  outline: none;
  border-color: var(--color-accent-important);
}
```

**Código después:**
```scss
.calculator-input-field:focus {
  outline: 2px solid var(--color-accent-important);
  outline-offset: 2px;
  border-color: var(--color-accent-important);
}
```

**Impacto:** Alto - Los usuarios de teclado no pueden saber dónde están navegando.

---

### Error 5: Falta de "skip link" para saltar al contenido principal

**Criterio WCAG incumplido:** 2.4.1 Evitar bloques - Nivel A

**Descripción del problema:**
No existía un enlace de salto al contenido principal, obligando a los usuarios de teclado a tabular por todo el menú de navegación en cada página.

**Ubicación:**
- Archivo HTML: `frontend/src/app/app.html`
- Archivo CSS: `frontend/src/styles/04-layout/_layout.scss`

**Código antes:**
```html
<app-header></app-header>
<main class="layout-main">
  <router-outlet></router-outlet>
</main>
```

**Código después:**
```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<app-header></app-header>

<main id="main-content" class="layout-main" tabindex="-1">
  <router-outlet></router-outlet>
</main>
```

**CSS añadido:**
```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-accent-important);
  color: var(--color-neutral-900);
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 600;
  z-index: 100;

  &:focus {
    top: 0;
  }
}
```

**Impacto:** Medio - Mejora significativa en la experiencia de navegación por teclado.

---

### Resumen de correcciones

| Error | Criterio WCAG | Impacto | Estado |
|-------|---------------|---------|--------|
| Idioma incorrecto | 3.1.1 (A) | Alto | ✅ Corregido |
| Botones sin type | 4.1.2 (A) | Medio | ✅ Corregido |
| Toast sin aria-label | 4.1.2 (A) | Alto | ✅ Corregido |
| outline: none | 2.4.7 (AA) | Alto | ✅ Corregido |
| Falta skip link | 2.4.1 (A) | Medio | ✅ Corregido |

---

## 5. Análisis de estructura semántica

### 5.1. Landmarks (Regiones de la página)

Las **landmarks** (puntos de referencia) son elementos semánticos que permiten a los lectores de pantalla navegar rápidamente entre secciones principales.

#### Estructura implementada

```html
<body>
  <header>        <!-- Cabecera principal -->
    <nav></nav>   <!-- Navegación principal -->
  </header>
  
  <main>          <!-- Contenido principal -->
    <section></section>
    <section></section>
  </main>
  
  <footer>        <!-- Pie de página -->
    <nav></nav>   <!-- Navegación secundaria (si aplica) -->
  </footer>
</body>
```

#### Verificación por página

| Página | `<header>` | `<nav>` | `<main>` | `<footer>` | `<section>` |
|--------|------------|---------|----------|------------|-------------|
| Home | ✅ | ✅ | ✅ | ✅ | ✅ (4) |
| Contacto | ✅ | ✅ | ✅ | ✅ | ✅ (2) |
| Calculadora | ✅ | ✅ | ✅ | ✅ | ✅ (3) |
| Presupuestos | ✅ | ✅ | ✅ | ✅ | ✅ (2) |

**Conclusión:** Todas las páginas principales implementan correctamente las landmarks HTML5.

---

### 5.2. Jerarquía de encabezados

Una estructura de encabezados lógica (`<h1>` a `<h6>`) permite a los usuarios navegar por el contenido y entender la organización de la información.

#### Página: Home (`/`)

```
<h1> Korporativo Vinilos - Calcula tus vinilos personalizados        [Nivel 1]
  <h2> ¿Por qué elegir Korporativo?                                  [Nivel 2]
  <h2> Proyectos Korporativo                                         [Nivel 2]
  <h2> Más sobre Korporativo                                         [Nivel 2]
    <h3> Redes sociales                                              [Nivel 3]
    <h3> Soporte                                                     [Nivel 3]
    <h3> Nuestro estudio                                             [Nivel 3]
```

**Estado:** ✅ Jerarquía correcta sin saltos de nivel.

#### Página: Contacto (`/contacto`)

```
<h1> Contacta con nosotros                                           [Nivel 1]
  <h2> Información de contacto                                       [Nivel 2]
  <h2> Envíanos un mensaje                                           [Nivel 2]
```

**Estado:** ✅ Jerarquía correcta.

#### Página: Calculadora (`/calculadora`)

```
<h1> Calcula el precio de tu vinilo                                  [Nivel 1]
  <h2> Dimensiones                                                   [Nivel 2]
  <h2> Características                                               [Nivel 2]
  <h2> Resultado                                                     [Nivel 2]
```

**Estado:** ✅ Jerarquía correcta.

**Conclusión:** Todas las páginas respetan la jerarquía de encabezados sin saltos de nivel.

---

### 5.3. Imágenes y textos alternativos

Todas las imágenes del proyecto tienen atributo `alt` descriptivo. A continuación se verifica su calidad.

#### Carrusel de proyectos (Home)

| Imagen | Atributo `alt` | Estado | Observaciones |
|--------|----------------|--------|---------------|
| proyecto-1.jpeg | "Vinilo corporativo instalado en fachada comercial" | ✅ Descriptivo | Informa contexto y propósito |
| proyecto-2.jpeg | "Rotulación de vehículo con diseño personalizado" | ✅ Descriptivo | Especifica tipo y aplicación |
| proyecto-3.jpeg | "Decoración interior con vinilo de gran formato" | ✅ Descriptivo | Identifica ubicación y características |
| proyecto-4.jpeg | "Señalética corporativa en cristal con efecto esmerilado" | ✅ Descriptivo | Detalla material y técnica |
| proyecto-5.jpeg | "Display promocional con impresión fotográfica de alta calidad" | ✅ Descriptivo | Describe propósito y calidad |

#### Imágenes decorativas

| Imagen | Tratamiento | Estado |
|--------|-------------|--------|
| Logo (SVG) | `alt="Korporativo Vinilos"` | ✅ Correcto |
| Iconos UI | Implementados como SVG inline con `<title>` | ✅ Correcto |

**Conclusión:** Todas las imágenes cumplen con el criterio WCAG 1.1.1 (Contenido no textual).

---

### 5.4. Formularios y etiquetas

Todos los campos de formulario deben tener `<label>` asociados correctamente para que los lectores de pantalla puedan identificarlos.

#### Formulario de contacto

```html
<label for="nombre">Nombre completo *</label>
<input type="text" id="nombre" name="nombre" required>

<label for="email">Correo electrónico *</label>
<input type="email" id="email" name="email" required>

<label for="mensaje">Mensaje *</label>
<textarea id="mensaje" name="mensaje" required></textarea>
```

**Estado:** ✅ Todos los campos tienen `<label>` con `for` correcto.

#### Calculadora de vinilos

```html
<label for="ancho">Ancho (cm)</label>
<input type="number" id="ancho" name="ancho" min="1">

<label for="alto">Alto (cm)</label>
<input type="number" id="alto" name="alto" min="1">

<label for="material">Material</label>
<select id="material" name="material">
  <option value="monomerico">Monomérico</option>
  <!-- ... -->
</select>
```

**Estado:** ✅ Todos los campos tienen `<label>` asociado.

**Conclusión:** Se cumple el criterio WCAG 3.3.2 (Etiquetas o instrucciones).

---

## 7. Resultados finales tras correcciones

### 7.1. Lighthouse (después de correcciones)

**Fecha de auditoría:** 12 de febrero de 2026  
**Herramienta:** Lighthouse integrado en Chrome DevTools  
**URL analizada:** `http://localhost:4200` (desarrollo)

#### Comparativa antes/después

| Categoría | Antes | Después | Mejora |
|-----------|-------|---------|--------|
| **Performance** | 89/100 | 55/100 | -34 ⚠️ |
| **Accessibility** | 93/100 | **100/100** | **+7** ✅ |
| **Best Practices** | 100/100 | 100/100 | 0 ✅ |
| **SEO** | 83/100 | 100/100 | +17 ✅ |

**Capturas:** 
- Antes: `capturas/lighthouse-antes.png`
- Después: `capturas/Lighthouse.png`

#### Análisis detallado de resultados

**🎉 Accessibility: 93 → 100/100 (+7 puntos)**

**Mejoras aplicadas que lograron la puntuación perfecta:**
1. ✅ Corregido `<html lang="es">` (antes estaba en inglés)
2. ✅ Añadido skip link "Saltar al contenido principal"
3. ✅ Corregido `outline` visible en todos los inputs (antes tenía `outline: none`)
4. ✅ Añadido `type="button"` a botones sin type explícito
5. ✅ Añadido `aria-label` al botón de cerrar toast

**Resultado:** 0 errores detectados por Lighthouse tras las correcciones.

---

**✅ SEO: 83 → 100/100 (+17 puntos)**
- Mejoras en meta tags
- HTML semántico mejorado
- Títulos más descriptivos

**✅ Best Practices: 100/100 (mantenido)**
- Sin errores de consola
- APIs modernas utilizadas correctamente
- Sin librerías con vulnerabilidades

**⚠️ Performance: 89 → 55/100 (-34 puntos)**
- La bajada es normal: el reporte anterior era en producción (`korporativo.vercel.app`) con assets optimizados
- El reporte actual es en desarrollo (`localhost:4200`) sin optimizaciones de build
- No afecta a la accesibilidad, que es el objetivo principal de este proyecto

**Objetivo superado:** ✅ ≥ 85 puntos en Accessibility (conseguido: 100/100)

---

### 7.4. Checklist WCAG 2.1 Nivel AA

#### Perceptible

| Criterio | Nivel | Cumple | Evidencia |
|----------|-------|--------|-----------|
| 1.1.1 Contenido no textual | A | ✅ | Todas las imágenes tienen `alt` |
| 1.3.1 Información y relaciones | A | ✅ | HTML semántico, `<label>` en formularios |
| 1.4.5 Imágenes de texto | AA | ✅ | Uso de texto real (no imágenes de texto) |

#### Operable

| Criterio | Nivel | Cumple | Evidencia |
|----------|-------|--------|-----------|
| 2.4.1 Evitar bloques | A | ✅ | Landmarks y estructura clara |
| 2.4.2 Página titulada | A | ✅ | Todas las rutas tienen `<title>` |
| 2.4.6 Encabezados y etiquetas | AA | ✅ | Jerarquía de encabezados correcta |

#### Comprensible

| Criterio | Nivel | Cumple | Evidencia |
|----------|-------|--------|-----------|
| 3.1.1 Idioma de la página | A | ✅ | `<html lang="es">` |
| 3.2.3 Navegación coherente | AA | ✅ | Menú consistente en todas las páginas |
| 3.3.2 Etiquetas o instrucciones | A | ✅ | Todos los campos tienen `<label>` |

#### Robusto

| Criterio | Nivel | Cumple | Evidencia |
|----------|-------|--------|-----------|
| 4.1.1 Procesamiento | A | ✅ | HTML válido (W3C Validator) |

---

## 📎 Anexos

### Enlaces útiles

- [WCAG 2.1 (español)](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&levels=aaa)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [WAVE](https://wave.webaim.org/)
- [TAW](https://www.tawdis.net/)
- [NVDA](https://www.nvaccess.org/)

---

**Proyecto:** Korporativo Vinilos  
**Asignatura:** Diseño de Interfaces Web (DIW)  
**Fase:** Proyecto Órbita 4 - Diseñar para todos  
**Fecha:** Febrero 2026
