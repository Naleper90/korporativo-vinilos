# Korporativo Vinilos

**Gestión y presupuesto de vinilos personalizados.**  
Aplicación web Full-Stack desarrollada como proyecto integrador para el ciclo de **Desarrollo de Aplicaciones Web (2º DAW)**.

**URL DE PRODUCCIÓN:** [https://korporativo.vercel.app](https://korporativo.vercel.app)

***

## Descripción

**Korporativo Vinilos** es una solución digital que permite a usuarios particulares y empresas calcular el coste de impresión de vinilos en tiempo real, gestionar sus presupuestos guardados y realizar pedidos.

El proyecto destaca por implementar una arquitectura profesional escalable, separando el Frontend (SPA) del Backend (API REST), con énfasis en la calidad del código, la accesibilidad y el diseño responsive.

## Características principales

*   **Calculadora Reactiva:** Cálculo de precios instantáneo según medidas, material y acabados.
*   **Gestión de Presupuestos:** Panel privado (Dashboard) para crear, visualizar y borrar presupuestos.
*   **Autenticación Segura:** Sistema de Registro y Login protegido con JWT (JSON Web Tokens).
*   **Diseño Modular:** Componentes UI reutilizables basados en una guía de estilos propia.
*   **Modo Oscuro:** Sistema de temas (Claro/Oscuro) con persistencia en el navegador.
*   **Arquitectura CSS:** Metodología BEM + ITCSS para estilos escalables y mantenibles.
*   **Accesibilidad WCAG 2.1 AA:** Cumplimiento completo de las pautas de accesibilidad web (100% de criterios).

---

## Accesibilidad Web (WCAG 2.1)

### Nivel de Conformidad Alcanzado

**WCAG 2.1 Nivel AA - 100% de criterios cumplidos** ✅

| Nivel | Criterios evaluados | Cumplidos | Porcentaje |
|-------|---------------------|-----------|------------|
| **Nivel A** | 30 | 30 | **100%** |
| **Nivel AA** | 20 | 20 | **100%** |
| **TOTAL** | **50** | **50** | **100%** |

### Componente multimedia añadido

**Tipo:** Carrusel de imágenes (slideshow)  
**Descripción:** Muestra 5 proyectos realizados con navegación por flechas e indicadores de posición.

### Resultados de auditoría de accesibilidad

| Herramienta | Puntuación inicial | Puntuación final | Mejora |
|-------------|-------------------|------------------|--------|
| Lighthouse | 93/100 | 100/100 | +7 puntos |
| WAVE | No realizada | 0 errores | - |
| TAW | No realizada | 5 problemas menores | - |

**Nivel de conformidad alcanzado:** WCAG 2.1 Nivel AA

### Errores corregidos

| # | Error | Criterio WCAG | Estado |
|---|-------|---------------|--------|
| 1 | Idioma incorrecto (`lang="en"`) | 3.1.1 (A) | ✅ Corregido |
| 2 | Botones sin `type="button"` | 4.1.2 (A) | ✅ Corregido |
| 3 | Botón toast sin `aria-label` | 4.1.2 (A) | ✅ Corregido |
| 4 | `outline: none` en inputs | 2.4.7 (AA) | ✅ Corregido |
| 5 | Falta de skip link | 2.4.1 (A) | ✅ Corregido |

### Verificación realizada

- ✅ Auditoría con Lighthouse, WAVE y TAW
- ✅ Test con lector de pantalla (NVDA)
- ✅ Test de navegación por teclado
- ✅ Verificación cross-browser (Chrome 144, Firefox 147, Edge 144)

### Documentación completa

**[Ver análisis completo de accesibilidad](./docs/accesibilidad/README.md)** (8 secciones, 1700+ líneas)

**Contenido:**
1. Fundamentos de accesibilidad (WCAG, principios POUR, niveles)
2. Componente multimedia accesible (carrusel CSS)
3. Auditorías con herramientas automáticas
4. Errores detectados y correcciones aplicadas (5 errores)
5. Análisis de estructura semántica
6. Tests manuales de accesibilidad
7. Checklist WCAG 2.1 Nivel AA completo (50 criterios)
8. Conclusiones y reflexión

---

## Stack Tecnológico

### Frontend (Cliente Web)
*   **Framework:** Angular 17+ (Componentes Standalone).
*   **Lenguaje:** TypeScript 5.
*   **Estilos:** SCSS (Sass) + Variables CSS (Custom Properties).
*   **Despliegue:** Vercel.

### Backend (Servidor API)
*   **Framework:** Spring Boot 3.
*   **Lenguaje:** Java 21.
*   **Base de Datos:** PostgreSQL (Producción) / H2 (Desarrollo).
*   **Seguridad:** Spring Security + JWT + BCrypt.
*   **Despliegue:** Railway (Dockerizado).

---

## Rutas principales

El proyecto implementa un sistema de rutas con Angular Router:

| Ruta | Descripción | Protección |
|------|-------------|------------|
| `/` | Página principal | Pública |
| `/calculadora` | Calculadora de precios | Pública |
| `/contacto` | Formulario de contacto | Pública |
| `/presupuestos` | Lista de presupuestos guardados | Pública |
| `/presupuestos/:id` | Detalle de presupuesto | Pública |
| `/usuario` | Área privada de usuario | Requiere login |
| `/usuario/perfil` | Perfil de usuario | Requiere login |
| `/usuario/pedidos` | Pedidos del usuario | Requiere login |

**Características:**
- Lazy loading en área de usuario
- Protección con guards (authGuard)
- Breadcrumbs dinámicos

---

## Instalación y Despliegue Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Naleper90/korporativo-vinilos.git
cd korporativo-vinilos
```

### 2. Arrancar el Backend (API)
- Abre la carpeta del backend en tu IDE
- Configura las variables de entorno para la base de datos (o usa el perfil `dev` con H2)
- Ejecuta:
  ```bash
  ./mvnw spring-boot:run
  ```

### 3. Arrancar el Frontend (Angular)
- Abre una terminal en la carpeta raíz del frontend
- Instala las dependencias:
  ```bash
  npm install
  ```
- Inicia el servidor de desarrollo:
  ```bash
  ng serve
  ```
- Accede a la aplicación en: `http://localhost:4200/`

---

## Contribución

Este es un proyecto académico de 2º DAW.

**Documentación adicional:**
- `docs/dwec/DOCUMENTACION.md` - Documentación técnica completa
- `docs/design/DOCUMENTACION.md` - Documentación de diseño
- `docs/accesibilidad/README.md` - Análisis de accesibilidad WCAG 2.1

---

**Autora:** Natalia Alejo Pérez (2º DAW)
*Proyecto desarrollado para las asignaturas de Diseño de Interfaces Web (DIW), Desarrollo Web en Entorno Cliente (DWEC) y Desarrollo Web en Entorno Servidor (DWES).*
