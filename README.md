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
