# Korporativo Vinilos

Aplicación web para calcular precios y gestionar presupuestos/facturas de vinilos para la empresa ficticia **Korporativo Studio**.  
Este repositorio corresponde a la **primera versión del proyecto** desarrollada para las asignaturas **DIW** y **DWEC** del ciclo **2º DAW**.  
**Autora:** Natalia Alejo Pérez (2º DAW).

## Tecnologías

- Framework **Angular**.  
- TypeScript, HTML5 y CSS (con variables y estilos modulares).  
- Maquetación semántica y diseño responsive básico.

## Puesta en marcha (desarrollo)

1. Instalar dependencias:

```
npm install
```

2. Arrancar el servidor de desarrollo:

```
ng serve
```

3. Abrir el navegador en:

```
http://localhost:4200/
```

La aplicación se recarga automáticamente al guardar cambios en el código fuente.

## Scripts habituales

- **Construir el proyecto** (genera la carpeta `dist/`):

```
ng build
```

## Estructura general

- `src/app`  
- `components/` – Componentes reutilizables (botones, cards, formularios, alerts, etc.).  
- `pages/` – Páginas principales (inicio, calculadora, contacto, style guide).  
- `services/` – Servicios de tema (modo claro/oscuro), notificaciones y carga.  
- `src/styles/` – Variables, reset y estilos globales.

## Páginas principales

- **Inicio:** Presentación de Korporativo Studio y acceso a las secciones clave.  
- **Calculadora:** Pantalla para simular precios de vinilos según diferentes parámetros.  
- **Contacto:** Información de la empresa y formulario de contacto accesible.  
- **Style Guide:** Guía de estilos con botones, formularios, alerts y otros componentes UI.

## Objetivo de esta versión

- Implementar la maquetación principal, navegación y componentes básicos de interfaz.  
- Unificar estilos mediante una guía de estilos y un sistema de variables CSS.  
- Dejar preparada la base para futuras versiones con más lógica de negocio
(cálculo completo de presupuestos y gestión avanzada de facturas).

---


# Korporativo Vinilos

Aplicación web Full-Stack para la gestión y cálculo de presupuestos de vinilos personalizados. Desarrollada como proyecto para el ciclo DAW (Desarrollo de Aplicaciones Web).

🔗 **URL DE PRODUCCIÓN:** [PEGAR AQUÍ TU URL DE VERCEL]

![Korporativo Vinilos Hero Image](assets/images/hero-home.jpg)

## 🚀 Descripción

Korporativo Vinilos permite a los usuarios calcular el coste de sus vinilos basándose en dimensiones y materiales, gestionar sus presupuestos y contactar con la empresa. El proyecto destaca por una arquitectura CSS robusta (ITCSS/BEM), un diseño completamente responsive y una separación clara entre Frontend y Backend.

## 🛠 Tecnologías utilizadas

### Frontend (DWEC + DIW)
- **Framework**: Angular 17+
- **Estilos**: SCSS con arquitectura ITCSS y BEM.
- **Diseño**: Custom Properties (Variables CSS) para temas Claro/Oscuro.
- **Optimización**: Imágenes WebP, Lazy Loading.

### Backend (DWES)
- **Framework**: Spring Boot 3 (Java 17).
- **Seguridad**: Spring Security + JWT.
- **Base de Datos**: H2 (Dev) / MySQL (Prod).
- **API**: RESTful.

### DevOps & Despliegue
- **Frontend**: Vercel.
- **Backend**: Railway (Docker).
- **Control de versiones**: Git & GitHub.

## ✨ Características principales

1.  **Calculadora Reactiva**: Precio actualizado en tiempo real según input de usuario.
2.  **Sistema de Diseño**: Componentes UI reutilizables (Botones, Cards, Inputs).
3.  **Modo Oscuro**: Cambio de tema instantáneo y persistente.
4.  **Autenticación**: Registro y Login seguro con tokens JWT.
5.  **Responsive**: Interfaz "Mobile First" adaptada a cualquier dispositivo.

## 📦 Instalación local

Si deseas ejecutar el proyecto en tu máquina:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Naleper90/korporativo-vinilos.git
    ```

2.  **Backend**:
    - Navegar a `/backend`.
    - Ejecutar: `./mvnw spring-boot:run`

3.  **Frontend**:
    - Navegar a `/frontend`.
    - Instalar dependencias: `npm install`
    - Ejecutar: `ng serve`
    - Abrir navegador en `http://localhost:4200`
