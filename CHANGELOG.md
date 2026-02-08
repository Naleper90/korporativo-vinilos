# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Tests de integración E2E
- Mejoras en optimización de imágenes

---

## [1.0.0] - 2026-02-05

Primera versión completa en producción (https://korporativo.vercel.app)

### Added

- Sistema de eventos del DOM (click, document:click, outputs personalizados)
- Manipulación del DOM con ViewChild y ElementRef
- Menú hamburguesa responsive con cierre al hacer clic fuera
- Theme switcher (claro/oscuro) con persistencia en localStorage
- Modal y toast de confirmación
- Componentes reutilizables (Button, Card, Alert, FormInput, FormSelect, FormTextarea)
- Formulario de registro con validaciones síncronas y asíncronas
- Validadores personalizados (password fuerte, teléfono, cross-field)
- FormArray dinámico para múltiples teléfonos
- Sistema de rutas SPA completo con lazy loading
- Rutas con parámetros dinámicos y rutas hijas
- Route Guards (CanActivate y CanDeactivate)
- Resolver para precarga de datos
- Breadcrumbs dinámicos
- Configuración global de HttpClient con interceptor
- CRUD completo de presupuestos consumiendo API REST
- Manejo de errores HTTP con retry
- Paginación y búsqueda con debounce
- Gestión de estado con Signals (BudgetStateService)
- Actualización dinámica sin recargas
- Optimizaciones de rendimiento (OnPush, trackBy, take(1), takeUntil)
- Configuración .browserslistrc para targets cross-browser
- Documentación completa de compatibilidad (Chrome, Firefox, Edge)
- Tests unitarios con Karma/Jasmine (94 tests, coverage 56.36%)
- Lighthouse audit (Performance: 89, Accessibility: 93, Best Practices: 100, SEO: 83)
- Análisis de bundles (754.90 kB comprimido con gzip)

### Changed

- Migración a arquitectura standalone (Angular 19)
- Sistema de temas refactorizado con Signals
- Datos mock reemplazados por API REST de Spring Boot

### Fixed

- Modal de contacto sin cerrar tag HTML correctamente
- Formulario de contacto sin mostrar confirmación
- Scroll position en navegación entre rutas

### Security

- Autenticación con JWT
- HTTPS en producción
- Content Security Policy

---

## [0.2.0] - 2026-01-15

### Added

- Calculadora de precios de vinilos
- Formulario de contacto
- Estilos con metodología BEM + ITCSS

### Changed

- Refactorización a SCSS
- Mejoras en responsive design

---

## [0.1.0] - 2025-12-10

### Added

- Estructura inicial del proyecto
- Layout base (header, footer, main)
- Página de inicio
- README con instrucciones básicas

---

Autora: Natalia Alejo Pérez
Proyecto: 2º DAW
