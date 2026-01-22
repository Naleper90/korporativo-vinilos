# Memoria técnica del proyecto (Backend)

Este documento recoge la memoria técnica del backend del proyecto **"Korporativo Vinilos"**, una API REST completa para la gestión de clientes y presupuestos de vinilos personalizados. La aplicación está desarrollada con **Spring Boot 3** y **Java 21**, implementa seguridad mediante **JWT** y está desplegada en la nube.

## 1. Tecnologías y Entorno

*   **Lenguaje:** Java 21.
*   **Framework:** Spring Boot 3 (Spring Web, Spring Data JPA, Spring Security).
*   **Base de Datos (Desarrollo):** H2 Database (en memoria).
*   **Base de Datos (Producción):** PostgreSQL (alojada en Railway).
*   **Seguridad:** Spring Security con autenticación basada en Tokens (JWT).
*   **Despliegue:** Railway (Dockerizado).

## 2. Modelo de datos

El modelo se ha implementado mediante entidades JPA. El esquema de base de datos se genera automáticamente (`ddl-auto: update`) permitiendo una transición fluida entre el entorno de desarrollo y producción.

El modelo de datos se organiza en cuatro entidades principales:

*   **User (Usuario)**
*   **Cliente**
*   **Presupuesto**
*   **ViniloConfig (Línea de presupuesto)**

### Tablas y campos

#### Tabla `users` (NUEVA)
Gestión de acceso y roles.
*   `id` (PK, Long, Identity)
*   `username` (Unique, String)
*   `email` (Unique, String)
*   `password` (String, encriptada con BCrypt)
*   `role` (String: 'ROLE_USER', 'ROLE_ADMIN')

#### Tabla `clientes`
Cartera de clientes para reutilizar datos de contacto.
*   `id` (PK, Long)
*   `nombre`
*   `email`
*   `telefono`
*   `empresa`

#### Tabla `presupuestos`
Cabecera del presupuesto.
*   `id` (PK, Long)
*   `titulo`
*   `descripcion`
*   `precio` (Double)
*   `fecha` (Date)
*   `cliente_id` (FK → `clientes.id`)
*   `user_id` (FK → `users.id`) **(NUEVO: Vinculación con el usuario creador)**

#### Tabla `vinilo_configs`
Líneas de detalle del presupuesto.
*   `id` (PK, Long)
*   `ancho_cm`, `alto_cm`
*   `tipo_vinilo`, `tipo_corte`, `tipo_adhesivo`
*   `pais`, `incluir_iva`, `incluir_instalacion`
*   `precio_base`, `precio_final`
*   `presupuesto_id` (FK → `presupuestos.id`)

### Relaciones y Diagrama ER

Las relaciones se han diseñado para garantizar la integridad referencial y el borrado en cascada:

1.  **Users 1:N Presupuestos:** Un usuario puede crear múltiples presupuestos.
2.  **Clientes 1:N Presupuestos:** Un cliente puede tener asignados varios presupuestos.
3.  **Presupuestos 1:N ViniloConfig:** Un presupuesto contiene múltiples configuraciones.
    *   *Nota técnica:* Se ha configurado `CascadeType.ALL` y `orphanRemoval = true`. Si se elimina un presupuesto, se eliminan automáticamente todas sus líneas de vinilo asociadas para evitar inconsistencias en la base de datos.

## 3. Arquitectura y Seguridad

### Capas de la aplicación
La aplicación sigue una arquitectura limpia en capas:
1.  **Controller:** Expone los endpoints REST (`/api/auth`, `/api/presupuestos`, etc.). Gestiona las peticiones HTTP y respuestas JSON.
2.  **Service:** Contiene la lógica de negocio, cálculos de precios y validaciones.
3.  **Repository:** Interfaces que extienden `JpaRepository` para la comunicación con la base de datos.
4.  **Security (Filter Chain):** Intercepta cada petición para validar el token JWT antes de permitir el acceso a los recursos protegidos.

### Seguridad (JWT)
Se ha implementado un sistema de autenticación "Stateless" (sin estado) ideal para arquitecturas con Frontend separado (Angular):
1.  **Registro/Login:** El usuario envía credenciales. Si son válidas, el servidor devuelve un **Token JWT** (JSON Web Token).
2.  **Encriptación:** Las contraseñas se almacenan hasheadas utilizando el algoritmo **BCrypt**.
3.  **Autorización:** Para acceder a endpoints protegidos (ej: `POST /api/presupuestos`), el frontend debe enviar el token en la cabecera `Authorization: Bearer <token>`.

### Configuración CORS
Dado que el Frontend (Vercel) y el Backend (Railway) están en dominios diferentes, se ha configurado una política **CORS (Cross-Origin Resource Sharing)** global para permitir peticiones `GET`, `POST`, `PUT`, `DELETE` desde el dominio de producción del cliente Angular.

## 4. Justificación de cambios recientes

Durante el desarrollo final se realizaron ajustes clave para la estabilidad del sistema:

*   **Integridad en borrado:** Se detectó que no se podían borrar presupuestos con líneas asociadas. Se solucionó implementando borrado en cascada (`CascadeType.ALL`) en la entidad `Presupuesto`.
*   **Optimización de carga:** Se ajustó la estrategia de carga (`FetchType.EAGER` vs `LAZY`) y se utilizaron anotaciones `@JsonIgnore` para romper bucles infinitos en la serialización JSON de las relaciones bidireccionales (Padre <-> Hijo).
*   **Migración a PostgreSQL:** Para el entorno de producción en Railway, se migró de H2 a PostgreSQL para garantizar la persistencia de los datos tras los reinicios del servidor.