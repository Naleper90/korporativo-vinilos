# Korporativo Vinilos

**Gestión y presupuesto de vinilos personalizados.**  
Aplicación web Full-Stack desarrollada como proyecto integrador para el ciclo de **Desarrollo de Aplicaciones Web (2º DAW)**.

🚀 **URL DE PRODUCCIÓN:** [https://korporativo.vercel.app](https://korporativo.vercel.app)

***

## 📖 Descripción

**Korporativo Vinilos** es una solución digital que permite a usuarios particulares y empresas calcular el coste de impresión de vinilos en tiempo real, gestionar sus presupuestos guardados y realizar pedidos.

El proyecto destaca por implementar una arquitectura profesional escalable, separando el Frontend (SPA) del Backend (API REST), con énfasis en la calidad del código, la accesibilidad y el diseño responsive.

## ✨ Características principales

*   **Calculadora Reactiva:** Cálculo de precios instantáneo según medidas, material y acabados.
*   **Gestión de Presupuestos:** Panel privado (Dashboard) para crear, visualizar y borrar presupuestos.
*   **Autenticación Segura:** Sistema de Registro y Login protegido con JWT (JSON Web Tokens).
*   **Diseño Modular:** Componentes UI reutilizables basados en una guía de estilos propia.
*   **Modo Oscuro:** Sistema de temas (Claro/Oscuro) con persistencia en el navegador.
*   **Arquitectura CSS:** Metodología BEM + ITCSS para estilos escalables y mantenibles.

## 🛠 Stack Tecnológico

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

## 📦 Instalación y Despliegue Local

Para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Naleper90/korporativo-vinilos.git
cd korporativo-vinilos
```

### 2. Arrancar el Backend (API)
*   Abre la carpeta del backend en tu IDE (IntelliJ/Eclipse).
*   Configura las variables de entorno para la base de datos (o usa el perfil `dev` con H2).
*   Ejecuta:
    ```bash
    ./mvnw spring-boot:run
    ```

### 3. Arrancar el Frontend (Angular)
*   Abre una terminal en la carpeta raíz del frontend.
*   Instala las dependencias:
    ```bash
    npm install
    ```
*   Inicia el servidor de desarrollo:
    ```bash
    ng serve
    ```
*   Accede a la aplicación en: **`http://localhost:4200/`**

***

## 🤝 Contribución

Este es un proyecto académico de 2º DAW. Si deseas reutilizar el código o contribuir, ten en cuenta la estructura actual del proyecto.

### Estructura del proyecto

**Frontend:**
- Componentes standalone (Angular 19)
- Estilos: SCSS con metodología BEM
- Gestión de estado: Signals y servicios reactivos
- Formularios reactivos con validaciones personalizadas

**Backend:**
- API REST con Spring Boot
- DTOs para transferencia de datos
- PostgreSQL en producción, H2 en desarrollo
- Autenticación JWT

### Convenciones de código actuales

**Nombres de archivos:**
- Componentes: `nombre.ts` (ej: `button.ts`, `calculator.ts`)
- Servicios: `nombre.service.ts` o `nombre.ts`
- Estilos: Un archivo `.scss` por componente

**Organización:**
- `components/shared/`: Componentes reutilizables
- `components/layout/`: Header, footer, breadcrumbs
- `pages/`: Páginas principales de la aplicación
- `services/`: Lógica de negocio y estado

### Instalación para desarrollo

Ver sección "Instalación y Despliegue Local" más arriba.

### Documentación adicional

- `CHANGELOG.md`: Historial de versiones
- `docs/dwec/DOCUMENTACION.md`: Documentación técnica completa (1700 líneas)
- `docs/dwec/evidencias-cross-browser/`: Capturas de pruebas en navegadores

***

**Autora:** Natalia Alejo Pérez (2º DAW)  
*Proyecto desarrollado para las asignaturas de Diseño de Interfaces Web (DIW), Desarrollo Web en Entorno Cliente (DWEC) y Desarrollo Web en Entorno Servidor (DWES).*
