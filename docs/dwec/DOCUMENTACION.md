# Fase 1 · Arquitectura de eventos y componentes interactivos

## 1. Introducción

En esta fase se ha implementado la capa de interacción de la aplicación Angular: gestión de eventos, manipulación del DOM desde componentes, theme switcher y varios componentes interactivos (menú hamburguesa, modal de contacto y tabs informativos).

---

## 2. Arquitectura general de eventos

### 2.1. Tipos de eventos usados

- **Eventos de ratón**
  - `click`: botones (menú, cerrar modal, enviar formulario, tabs, theme toggle).
  - `document:click`: cierre del menú mobile al hacer clic fuera.

- **Eventos de formularios**
  - `ngSubmit`: envío del formulario de contacto.
  - `Output` personalizado: emisión de `formSubmitted` desde el componente `ContactForm` al componente `Contact`.

- **Eventos de teclado (parcial)**
  - Preparado para usar `keydown`/`keyup` (por ahora no se usa `ESC`, pero la arquitectura lo permite).

### 2.2. Flujo de eventos principales

#### 2.2.1. Menú hamburguesa

1. El usuario pulsa el botón hamburguesa.
2. `Header`:
   - Hace `event.stopPropagation()` para que el `document:click` no cierre inmediatamente el menú.
   - Alterna `isMobileMenuOpen` entre `true/false`.
   - Llama a `updateMobileMenuDOM()`.
3. `updateMobileMenuDOM()` añade o quita la clase `layout-header__nav-mobile--open` en el elemento referenciado con `@ViewChild('mobileMenu')` (usa `ElementRef` para manipular clases del DOM).
4. Un `@HostListener('document:click')` escucha clics globales:
   - Si `isMobileMenuOpen` es `true` y el clic no viene del botón, se pone a `false` y se actualiza el DOM de nuevo.
5. El resultado es un menú mobile que se abre/cierra con animación y se cierra al hacer clic en cerrar.

#### 2.2.2. Theme switcher

1. El botón de tema en el header llama a `onToggleTheme()`.
2. `Header` delega en `ThemeService.toggleTheme()`.
3. `ThemeService`:
   - Obtiene el tema actual (`light`, `dark`, `system`) desde un `BehaviorSubject`.
   - Calcula el siguiente (`dark` ↔ `light`).
   - Llama a `setTheme(next)`:
     - Guarda el valor en `localStorage` (solo en navegador).
     - Actualiza el `BehaviorSubject` (`theme$`) para que cualquier componente suscrito se actualice.
     - Añade o quita la clase `dark-theme` en `<html>` (`document.documentElement`).
4. El header está suscrito a `theme$` para mostrar el texto correcto del botón (`Tema oscuro` / `Tema claro`).

#### 2.2.3. Formulario de contacto y modal

1. El usuario pulsa **Enviar** en `ContactForm`:
   - El botón dispara `(click)="onSubmit()"` o el formulario dispara `(ngSubmit)="onSubmit()"`.
2. `ContactForm`:
   - Recoge/valida los datos (validación por ahora básica).
   - Emite el evento de salida `formSubmitted.emit()` (decorador `@Output()`).
3. El componente `Contact` escucha ese evento:

```
<app-contact-form (formSubmitted)="onFormSubmit()"></app-contact-form>
```

4. `Contact.onFormSubmit()`:
- Muestra un log en consola.
- Llama a `this.modal.openModal()` usando `@ViewChild('modal') modal!: ModalComponent;`.
5. `ModalComponent` controla la visibilidad con un booleano o `*ngIf`:
- Muestra el toast con el mensaje de éxito (mensaje enviado correctamente).
- El botón **Cerrar** llama a `closeModal()` para ocultarlo.

Este flujo demuestra comunicación hijo → padre (Output) y padre → hijo (ViewChild).

#### 2.2.4. Tabs en la página de inicio

1. `Home` pasa un array de pestañas a `TabsComponent` mediante `@Input()`:

```
demoTabs = [
{ id: 'redes', label: 'Redes sociales', content: '…' },
{ id: 'soporte', label: 'Soporte', content: '…' },
{ id: 'equipo', label: 'Nuestro estudio', content: '…' },
];
```
```
<app-tabs [tabs]="demoTabs"></app-tabs>
```

2. `TabsComponent` mantiene el estado `activeTab` (ej. `'redes'`).
3. Cada botón de pestaña tiene `(click)="activeTab = tab.id"`.
4. En la vista, solo el panel cuya `tab.id` coincide con `activeTab` muestra su contenido (vía binding de clases y `*ngIf`).
5. Resultado: el contenido cambia sin recargar ni navegar de ruta.

---

## 3. Componentes interactivos implementados

### 3.1. Menú hamburguesa (header)

- **Ubicación**: `components/layout/header/`.
- **Funcionalidad**:
- Abre/cierra el menú mobile con botón hamburguesa.
- Cierra al hacer clic fuera (document click).
- Usa `ViewChild + ElementRef` para añadir/quitar clases CSS.
- Usa `stopPropagation` para evitar cierres no deseados.

### 3.2. Modal de contacto / toast de confirmación

- **Ubicación**: `modal/` + uso en `pages/contact/`.
- **Funcionalidad**:
- Se abre al enviar correctamente el formulario de contacto.
- Muestra un mensaje de confirmación.
- Se cierra con botón “Cerrar”.
- Usa `@ViewChild` para que el padre controle la apertura.

### 3.3. Tabs informativos en Home

- **Ubicación**: `components/shared/tabs/`.
- **Funcionalidad**:
- Muestra varias pestañas (Redes sociales, Soporte, Nuestro estudio).
- Cambia el contenido al hacer clic en cada pestaña.
- Usa `@Input()` para recibir configuración y estado interno `activeTab`.

### 3.4. Theme Switcher

- **Ubicación**: `services/theme.service.ts` + botón en `header`.
- **Funcionalidad**:
- Alterna entre tema claro/oscuro.
- Persistencia en `localStorage`.
- Aplica el tema en el arranque.
- Expone un observable `theme$` para que otros componentes reaccionen.

---

## 4. Manipulación del DOM

### 4.1. Acceso al DOM

- `Header` usa `@ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;` para:
- Añadir/quitar la clase `layout-header__nav-mobile--open`.

### 4.2. Control de visibilidad estructural

- `ModalComponent` y otros usan `*ngIf` para crear/destruir nodos del DOM según su estado (`isModalOpen`, etc.).
- Los tabs crean múltiples paneles y muestran solo el activo, controlando la estructura DOM sin manipular `innerHTML` directamente.

---

## 5. Tabla de eventos y compatibilidad

| **Evento**                 | **Dónde se usa**                              | **Propósito**                                    | **Compatibilidad**                          |
|---------------------------|-----------------------------------------------|--------------------------------------------------|---------------------------------------------|
| `click`                   | Botones de menú, tabs, enviar, cerrar modal   | Interacciones principales de usuario             | Excelente en todos los navegadores modernos |
| `document:click`          | Header (HostListener)                         | Cerrar menú mobile al hacer clic fuera          | Excelente en todos los navegadores modernos |
| `ngSubmit`                | Formulario de contacto                        | Manejar envío de formulario en Angular          | Excelente (Angular abstrae el evento)       |
| `Output` (`EventEmitter`) | ContactForm → Contact                         | Comunicación hijo → padre                        | Soportado por todas las versiones de Angular|
| `localStorage`            | ThemeService                                  | Persistir preferencia de tema                    | Navegadores modernos en entorno browser     |

*(Compatibilidad entendida como soporte en los navegadores evergreen actuales: Chrome, Edge, Firefox, Safari.)*

---

## 6. Resumen de cumplimiento Fase 1

- **Manipulación del DOM en componentes**  
- Acceso con `ViewChild` + `ElementRef`.  
- Modificación dinámica de clases y estilos (menú mobile, modal).  
- Creación/eliminación estructural con `*ngIf` y *ngFor.

- **Sistema de eventos**  
- Event binding (`click`, `ngSubmit`, outputs).  
- Prevención de comportamientos por defecto (`preventDefault` en formularios).  
- Control de propagación (`stopPropagation` en el botón hamburguesa).  

- **Componentes interactivos funcionales**  
- Menú hamburguesa con apertura/cierre y cierre al click fuera.  
- Modal/Toast de contacto con abrir/cerrar.  
- Tabs informativos en Home.

- **Theme Switcher funcional**  
- Detecta y aplica tema guardado en `localStorage`.  
- Permite alternar claro/oscuro.  
- Aplica el tema al cargar la aplicación.

# Fase 2 · Servicios y comunicación entre componentes

## 1. Introducción

En esta fase se ha implementado la capa de servicios Angular para comunicación entre componentes hermanos, sistema global de notificaciones (toasts) y gestión centralizada de estados de carga (spinner).

---

## 2. Arquitectura general de servicios

### 2.1. Tipos de servicios usados

- **LoadingService**: Gestión global de estados de carga
  - `BehaviorSubject<boolean>` para estado reactivo
  - Métodos `show()/hide()` públicos

- **NotificationsService**: Sistema de toasts/notificaciones
  - `Subject<Notification[]>` para array de mensajes
  - Tipos: `success`, `error`, `info`, `warning`

- **Patrón Observable/Subject**: Comunicación reactiva entre componentes

### 2.2. Flujo de eventos principales

#### 2.2.1. LoadingService (Spinner global)

1. El usuario pulsa **Enviar** en formulario de Contacto
2. `ContactComponent`:
   - Llama `this.loadingService.show()`
   - `LoadingService` emite `true` vía `loading$`
3. `AppSpinnerComponent` suscrito muestra overlay:
   - `position: fixed; inset: 0; z-index: 9998`
4. Tras 2s simulación: `loadingService.hide()` → emite `false`

```
Contact → LoadingService.show() → AppSpinner (global)
```
#### 2.2.2. NotificationsService (Toasts)

1. `ContactComponent` llama `notificationsService.success('Enviado')`
2. `NotificationsService` añade toast al array `notifications$`
3. `AppComponent` suscrito renderiza `<app-toast>` por cada notif
4. Auto-dismiss configurable (3-7s por tipo)

```
Contact → NotificationsService → AppComponent → AppToast ×N
```

---

## 3. Servicios implementados

### 3.1. LoadingService
```
src/app/services/loading.ts
```

- **Ubicación**: `services/loading.service.ts`
- **Funcionalidad**: Control global de spinner
- **Consumidor**: `AppSpinnerComponent`

### 3.2. NotificationsService
```
src/app/services/notification.ts
```

- **Ubicación**: `services/notification.ts`
- **Funcionalidad**: Toasts multinotificación
- **Consumidores**: `AppComponent` → `AppToastComponent`

### 3.3. Componentes de presentación
```
src/app/components/shared/spinner/spinner.ts
src/app/components/shared/toast/toast.ts
src/app/app.ts
```

---

## 4. Manipulación de estado reactivo

### 4.1. Suscripciones en componentes

- `AppSpinner`: `loading$ = this.loadingService.loading$`
- `AppComponent`: `notifications = this.notificationsService.notifications$`
- `*ngIf="(loading$ | async)"` y `*ngFor="let notif of notifications"`

### 4.2. Control de visibilidad estructural

- Spinner: `*ngIf` crea/destruye overlay completo
- Toasts: `*ngFor` renderiza dinámicamente cada notificación
- Auto-dismiss: `setTimeout` en servicio quita toast del array

---

## 5. Tabla de servicios y compatibilidad

| **Servicio**            | **Dónde se usa**                  | **Propósito**                       | **Compatibilidad**            |
|-------------------------|-----------------------------------|-------------------------------------|-------------------------------|
| **LoadingService**      | AppSpinner (global)              | Spinner durante operaciones async   | Angular RxJS completo         |
| **NotificationsService**| AppComponent → AppToast          | Sistema toasts multinotificación    | Angular RxJS completo         |
| **Observables**         | Todos los servicios              | Comunicación reactiva               | Angular 16+ RxJS 7+           |

# Fase 3 · Formularios Reactivos Avanzados

## 1. Introducción

En esta fase se implementa formularios reactivos avanzados en **`RegisterForm`**: FormBuilder, validadores síncronos/asíncronos, validación **cross-field** y **FormArray** dinámico para múltiples teléfonos.

---

## 2. Arquitectura general de formularios

### 2.1. Tipos de validadores implementados

- **Síncronos integrados**: `required`, `email`, `minLength(8)`
- **Síncronos personalizados**: `passwordFuerteValidator`, `telefonoValidator`
- **Cross-field**: `passwordsIgualesValidator` (form-level)
- **Asíncronos**: `emailUnicoValidator()`, `usernameDisponibleValidator()`

### 2.2. Flujo de validación principal

#### 2.2.1. Formulario reactivo completo
```
register-form.ts → FormBuilder.group() → 6 controles + FormArray
↓
Validación touched/dirty → Errores condicionales → Submit deshabilitado
```

#### 2.2.2. FormArray teléfonos dinámico
1. Usuario pulsa **"+ Añadir teléfono"**
2. `addTelefono()` → `telefonosArray.push(new FormGroup())`
3. `*ngFor` renderiza nuevo `<section>` con validación individual
4. `removeTelefono(i)` → `telefonosArray.removeAt(i)`

---

## 3. Validadores implementados

### 3.1. Tabla de validadores

| **Validador**                  | **Tipo**      | **Descripción**                          | **Ubicación**              |
|--------------------------------|---------------|------------------------------------------|----------------------------|
| `passwordFuerteValidator`      | Síncrono      | ≥8 chars + Mayús/Minús/Números           | `password` control         |
| `passwordsIgualesValidator`    | Cross-field   | Compara `password`/`confirmPassword`     | FormGroup level            |
| `telefonoValidator`            | Síncrono      | 9 dígitos numéricos                      | `phone` + FormArray        |
| `emailUnicoValidator()`        | Asíncrono     | Simula API (800ms delay)                 | `email` control            |
| `usernameDisponibleValidator()`| Asíncrono     | Simula API (600ms delay)                 | `username` control         |

### 3.2. Estados visuales
- **Errors**: `*ngIf="control.touched && hasError('X')"`
- **Pending**: `*ngIf="control.pending"` (loading asíncrono)
- **Submit**: `[disabled]="form.invalid"`

---

## 4. FormArray - Teléfonos múltiples

```
src/app/register-form.ts
```

**Implementación**:

```
telefonos: this.fb.array([
this.fb.group({numero: ['', [Validators.required, this.telefonoValidator]]})
])
```


**Template**:
```
<section formArrayName="telefonos"> <ng-container *ngFor="let tel of telefonosArray.controls; let i=index" [formGroupName]="i"> <!-- Validación individual por teléfono --> </ng-container> </section>
```

## 5. Gestión de estados reactivos

### 5.1. Feedback visual

```
touched → muestra errores específicos
pending → "Comprobando disponibilidad..."
invalid → deshabilita botón submit
```
### 5.2. Comunicación reactiva

- `form.valueChanges` implícito vía `FormBuilder`

- `form.statusChanges` → botón dinámico

- `AsyncValidatorFn` con `delay()` simula APIs reales

# Fase 4 · Sistema de rutas y navegación

## 1. Introducción

En esta fase se ha configurado el sistema de rutas de la SPA en Angular: páginas principales (inicio, calculadora, contacto, style guide), nuevo flujo de **presupuestos** (listado + detalle con parámetro dinámico) y una zona de ejemplo para **usuario**, además de una página 404 personalizada.

---

## 2. Mapa de rutas

| Ruta                       | Tipo           | Componente           | Descripción                                                   |
|---------------------------|----------------|----------------------|---------------------------------------------------------------|
| `/`                       | Principal      | `Home`               | Página de inicio de Korporativo Studio.                      |
| `/style-guide`            | Principal      | `StyleGuide`         | Guía de estilos con todos los componentes UI.                |
| `/contacto`               | Principal      | `Contact`            | Información de contacto y formulario accesible.              |
| `/calculadora`            | Principal      | `Calculator`         | Calculadora de precios de vinilos.                           |
| `/presupuestos`           | Listado        | `BudgetsList`        | Listado de presupuestos con enlaces al detalle.              |
| `/presupuestos/:id`       | Detalle        | `BudgetDetail`       | Detalle de un presupuesto concreto a partir de su `id`.      |
| `/usuario`                | Layout padre   | `UserLayout`         | Área de usuario con navegación interna.                      |
| `/usuario/perfil`         | Hija           | `UserProfile`        | Subpágina de perfil dentro de `UserLayout`.                  |
| `/usuario/pedidos`        | Hija           | `UserOrders`         | Subpágina de pedidos dentro de `UserLayout`.                 |
| `**`                      | Wildcard (404) | `NotFound`           | Página 404 para rutas inexistentes (ruta wildcard al final). |

---

## 3. Rutas con parámetros y rutas hijas

- **Presupuestos**  
  - `/presupuestos` muestra un listado de presupuestos cargados desde la API REST (`GET /api/presupuestos`), cada uno con un enlace `routerLink="['/presupuestos', budget.id]"`.  
  - `/presupuestos/:id` lee el parámetro dinámico mediante `ActivatedRoute.paramMap` y carga el detalle del presupuesto usando el servicio HTTP (`GET /api/presupuestos/{id}`), mostrando su información principal en `BudgetDetail`.  
  - Este patrón cubre el caso típico de **listado → detalle**, ahora ya conectado a una API real en lugar de usar datos mock.

- **Zona de usuario con rutas hijas**  
  - La ruta padre `/usuario` usa `UserLayout`, que incluye un menú interno con `routerLink="perfil"` y `routerLink="pedidos"` y un `<router-outlet>` secundario.  
  - Las rutas hijas `/usuario/perfil` y `/usuario/pedidos` se cargan dentro de este layout, manteniendo fijo el título “Área de usuario” y cambiando solo el contenido interno.

---

## 4. Ruta 404 y navegación básica

- Se ha definido una ruta wildcard `**` al final de la configuración que carga el componente `NotFound`, con un mensaje claro de error y un enlace de vuelta a `/`.  
- La navegación principal entre páginas se realiza con `routerLink` en el header y otras secciones (inicio, calculadora, contacto, style guide, presupuestos), evitando enlaces estáticos y recargas completas de página.

---

## 5. Navegación programática y uso de `state`

- Desde el listado de presupuestos se navega al detalle usando código en lugar de solo `routerLink`, con `this.router.navigate(['/presupuestos', budget.id], { state: { budget } })`.​

- Se envía el objeto presupuesto completo en la propiedad `state`, evitando repetir una carga o simular aún una API real.​

- En `BudgetDetail`, el constructor recupera el parámetro `id` desde `ActivatedRoute.paramMap` y el objeto `budget` desde `router.getCurrentNavigation()?.extras.state?.['budget']`.​

- El componente muestra el título y el total del presupuesto, además de un enlace de vuelta al listado, demostrando el patrón completo listado → navegación programática → detalle.

---

## 6. Lazy loading y precarga de módulos

- El área de usuario (`/usuario`) se ha aislado como conjunto de rutas de funcionalidad en `pages/user/user.routes.ts`, agrupando `UserLayout`, `UserProfile` y `UserOrders` bajo una misma ruta padre.  
- En el router principal (`app.routes.ts`) la ruta `/usuario` se carga de forma perezosa mediante `loadChildren: () => import('./pages/user/user.routes').then(m => m.USER_ROUTES)`, de modo que el código del área de usuario solo se descarga cuando se navega a `/usuario/...`.  
- La configuración global del router en `app.config.ts` añade la estrategia de precarga `withPreloading(PreloadAllModules)`, lo que hace que, tras la primera carga de la aplicación, Angular descargue en segundo plano los módulos lazy disponibles (en este caso, el área de usuario).  
- Se ha ejecutado un build de producción (`ng build --configuration production`) y se ha verificado la generación de chunks diferenciados: además del bundle principal (`main-*.js`), se crea un chunk específico etiquetado como `user-routes` tanto en la parte de navegador como en la de servidor, confirmando la segmentación del código entre la parte pública y el área de usuario.

---

## 7. Route Guards: protección de rutas y cambios sin guardar

En esta parte se han implementado **Route Guards** para controlar tanto el acceso a rutas sensibles como la salida de páginas con formularios sin guardar.

### 7.1. CanActivate: área de usuario protegida

- Se ha creado un servicio de autenticación simulado `AuthService` que mantiene un estado interno de “usuario autenticado” (`loggedIn`) y permite cambiarlo mediante métodos `login()` y `logout()`.  
- En `src/app/guards/auth.guard.ts` se define un guard funcional `authGuard` basado en **CanActivate**, que se ejecuta antes de acceder al área de usuario.  
- El guard inyecta `AuthService` y `Router` y aplica la lógica:  
  - Si `auth.isLoggedIn()` es `true`, devuelve `true` y permite navegar a la ruta solicitada.  
  - Si es `false`, guarda la URL a la que el usuario intentaba acceder mediante `auth.setRedirectUrl(state.url)` y devuelve `router.parseUrl('/contacto')`, redirigiendo a la página de contacto.  
- En la configuración de rutas (`app.routes.ts`), el área `/usuario` queda protegida así:

  ```ts
  {
    path: 'usuario',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/user/user.routes').then(m => m.USER_ROUTES),
  },
  ```

  De esta forma, cualquier intento de entrar en `/usuario/perfil` o `/usuario/pedidos` sin “login” simulado redirige automáticamente a `/contacto`.

- Para **simular la autenticación** de forma visible, en la página de Style Guide se inyecta `AuthService` y se añade una sección de demo con:  
  - Un texto que muestra el estado actual (`Usuario autenticado` / `Invitado`).  
  - Dos botones `Login demo` y `Logout demo` que llaman a `auth.login()` y `auth.logout()`.  
  Esto permite demostrar cómo, tras hacer “Login demo”, el guard deja de bloquear `/usuario/...` y la navegación al área de usuario pasa a ser correcta.

### 7.2. CanDeactivate: formulario de registro con cambios sin guardar

- El componente `RegisterForm` (`components/shared/register-form/register-form.ts`) utiliza formularios reactivos avanzados y se ha ampliado para detectar cambios no guardados:  
  - Se añade `markAsSaved()` que marca el formulario como `pristine` tras un envío correcto.  
  - Se expone el método `hasUnsavedChanges()` que devuelve `true` cuando el formulario está `dirty` y el envío (`submitted`) no se ha completado.  
  - En `onSubmit()`, después de validar y procesar el registro, se llama a `markAsSaved()` para limpiar el estado de cambios pendientes.

- En `src/app/guards/pending-changes.guard.ts` se crea un guard funcional `pendingChangesGuard` basado en **CanDeactivate** y tipado para `RegisterForm`. Su lógica es:  
  - Si `component.hasUnsavedChanges()` es `false`, devuelve `true` y permite salir sin preguntar.  
  - Si hay cambios sin guardar, muestra un diálogo nativo de confirmación:

    ```ts
    return confirm(
      'Hay cambios sin guardar en el formulario de registro. ¿Seguro que quieres salir de la página?'
    );
    ```

    Si el usuario acepta, la navegación continúa; si cancela, permanece en la ruta actual.

- En el sistema de rutas (`app.routes.ts`), se ha definido una ruta específica para este formulario:

  ```ts
  {
    path: 'registro',
    component: RegisterForm,
    canDeactivate: [pendingChangesGuard],
  },
  ```

  De este modo, cualquier intento de salir de `/registro` con el formulario modificado dispara el guard y muestra el aviso de “cambios sin guardar”.

Con este conjunto se cubre el uso combinado de **CanActivate** y **CanDeactivate**: el primero protege el acceso al área de usuario mediante una autenticación simulada con redirección a una ruta pública, y el segundo evita la pérdida accidental de datos en el formulario de registro, pidiendo confirmación al usuario antes de abandonar la página.

---

## 8. Resolvers

En la ruta de detalle de presupuesto se ha usado un **resolver** para cargar los datos desde la API antes de activar el componente y evitar vistas en blanco.

- `BudgetsHttpService` expone métodos `getBudgets()` y `getBudgetById(id)` que llaman a la API REST de Spring Boot (`GET /api/presupuestos` y `GET /api/presupuestos/{id}`), centralizando el acceso HTTP a los presupuestos en el frontend.  
- El resolver funcional `budgetResolver` inyecta este servicio y el router, lee el `id` desde `paramMap`, llama a `getBudgetById(id)` y devuelve el presupuesto o `null` si no existe.  
- En caso de presupuesto inexistente o error, el resolver redirige a `/presupuestos` con `queryParams` (`error=not-found` o `error=server-error`), evitando dejar el detalle en un estado inconsistente.  
- La ruta `/presupuestos/:id` se configura con `component: BudgetDetail` y `resolve: { budget: budgetResolver }`, de modo que el componente puede recibir el dato ya resuelto en `route.data['budget']`, aunque internamente también dispone del servicio HTTP para refrescar o editar el presupuesto.  
- `BudgetsList` sigue leyendo `queryParams.error` y muestra un aviso contextual (“Ha ocurrido un error al cargar el presupuesto.”) cuando el usuario es redirigido desde el resolver.

---

## 9. Breadcrumbs dinámicos

En esta parte se ha implementado un sistema de **breadcrumbs dinámicos** construido a partir de la configuración de rutas, que se actualiza automáticamente según la navegación y permite volver a rutas superiores.

### 9.1. Definición de breadcrumbs en las rutas

- En la configuración principal (`app.routes.ts`) se ha añadido la propiedad `data.breadcrumb` a las rutas relevantes:  
  - `/` → `Inicio`  
  - `/style-guide` → `Style guide`  
  - `/contacto` → `Contacto`  
  - `/calculadora` → `Calculadora`  
  - `/presupuestos` → `Presupuestos`  
  - `/presupuestos/:id` → `Detalle`  
  - `/usuario` → `Área de usuario`  
  - `/registro` → `Registro`  
  - `**` → `No encontrado`  
- En las rutas hijas de usuario (`user.routes.ts`) también se ha definido `data.breadcrumb`:  
  - `/usuario/perfil` → `Perfil`  
  - `/usuario/pedidos` → `Pedidos`  
- De esta forma, el texto visible en las migas no está hardcodeado en el componente, sino ligado a cada ruta dentro de la propia configuración del router.

### 9.2. Componente `<app-breadcrumbs>` y construcción dinámica

- Se ha creado un componente standalone `Breadcrumbs` (`components/layout/breadcrumbs/breadcrumbs.ts`) que se muestra en el layout principal justo debajo del header.
- El componente inyecta `Router` y `ActivatedRoute` y escucha los eventos de navegación (`NavigationEnd`) para recalcular los breadcrumbs cada vez que cambia la ruta.  
- A partir de la ruta raíz (`ActivatedRoute.root`), recorre recursivamente el árbol de rutas activas, acumulando:  
  - El `path` de cada segmento para construir la `url` parcial.  
  - El texto `data.breadcrumb` de cada segmento para generar la etiqueta visible.  
- El resultado se guarda en una colección de elementos `{ label, url }` que el template renderiza como:  
  - Un enlace inicial fijo a `/` (Inicio).  
  - Enlaces clicables para todos los niveles intermedios.  
  - Un último elemento solo texto para la página actual (breadcrumb activo).  
- Algunos ejemplos de resultado:  
  - En `/presupuestos` se muestra: `Inicio / Presupuestos`.  
  - En `/presupuestos/2`: `Inicio / Presupuestos / Detalle`.  
  - En `/usuario/perfil`: `Inicio / Área de usuario / Perfil`.  

### 9.3. Integración en el layout y utilidad para el usuario

- El componente `<app-breadcrumbs>` se ha integrado en la plantilla raíz `app.html`, dentro del `<main>`:  
  - Primero se muestra el header.  
  - A continuación los breadcrumbs.  
  - Debajo, el `<router-outlet>` con el contenido de cada página.  
- Gracias a esta posición, los breadcrumbs están presentes en toda la aplicación sin duplicar código y reflejan correctamente el camino actual a partir de la configuración de rutas. 
- Cada nivel intermedio (`Inicio`, `Presupuestos`, `Área de usuario`, etc.) funciona como enlace de navegación hacia atrás, permitiendo al usuario orientarse y volver fácilmente a secciones superiores, cumpliendo así el criterio de breadcrumbs dinámicos y navegables de la rúbrica.

---

## 10. Documentación del sistema de rutas

Además de la implementación, se ha documentado de forma explícita el sistema de enrutado:

- Se incluye un **mapa de rutas** en formato tabla donde se listan los paths principales (`/`, `/style-guide`, `/contacto`, `/calculadora`, `/presupuestos`, `/presupuestos/:id`, `/usuario/...`, `**`), el componente asociado y una descripción clara de cada página.
- Se describe la **estrategia de lazy loading** para el área de usuario (`/usuario`), indicando:  
  - Que se delega en un archivo separado (`user.routes.ts`) mediante `loadChildren`.  
  - Que se emplea precarga (`PreloadAllModules`) para descargar el código de la zona de usuario en segundo plano tras la primera carga.  
  - Que se han generado chunks separados en el build de producción, confirmando la separación entre código público y área de usuario.
- Hay un apartado específico de **Route Guards**, donde se explica:  
  - El guard `CanActivate` para `/usuario` (servicio de autenticación simulado, redirección a `/contacto`, demo de login/logout en la Style Guide).  
  - El guard `CanDeactivate` para `/registro` (detección de cambios sin guardar en `RegisterForm` y diálogo de confirmación antes de abandonar la página).
- El apartado de **Resolvers** documenta:  
  - La existencia de `BudgetsService` como fuente de datos.  
  - El resolver `budgetResolver` atado a `/presupuestos/:id`, que precarga el presupuesto, gestiona estados de error con redirección y expone los datos al componente mediante `route.data`.  
  - El manejo de mensajes de error en `BudgetsList` a partir de `queryParams`.

### 10.1. Tabla de rutas con guards, resolvers y breadcrumbs

| Ruta                 | Guards               | Resolver         | Breadcrumb        |
|----------------------|----------------------|------------------|-------------------|
| `/`                  | –                    | –                | Inicio            |
| `/style-guide`       | –                    | –                | Style guide       |
| `/contacto`          | –                    | –                | Contacto          |
| `/calculadora`       | –                    | –                | Calculadora       |
| `/presupuestos`      | –                    | –                | Presupuestos      |
| `/presupuestos/nuevo`| –                    | –                | Nuevo presupuesto |
| `/presupuestos/:id`  | –                    | `budgetResolver` | Detalle           |
| `/usuario`           | `authGuard`          | –                | Área de usuario   |
| `/usuario/perfil`    | Hereda `authGuard`   | –                | Perfil            |
| `/usuario/pedidos`   | Hereda `authGuard`   | –                | Pedidos           |
| `/registro`          | `pendingChangesGuard`| –                | Registro          |
| `**`                 | –                    | –                | No encontrado     |

---

# Fase 5 · Servicios HTTP y consumo de API

## 1. Introducción

En esta fase se ha preparado la infraestructura HTTP de la aplicación Angular: configuración global de `HttpClient`, creación de un servicio base `ApiService` y definición de un interceptor para cabeceras comunes. Gracias a esto, la app puede consumir la API de Spring Boot con operaciones CRUD reales de forma consistente en todos los módulos.

---

## 2. Arquitectura general de acceso HTTP

### 2.1. Configuración de HttpClient

- Se ha configurado el cliente HTTP a nivel global mediante los proveedores de Angular en `app.config.ts`, de modo que `HttpClient` está disponible en toda la aplicación sin importar módulos adicionales por componente o página.
- La configuración HTTP se declara junto al router y la precarga (`withPreloading(PreloadAllModules)`), manteniendo un único punto de entrada para la infraestructura de la SPA. Esto evita tener que importar módulos HTTP en cada feature y centraliza la configuración en un lugar fácil de localizar.

### 2.2. Interceptor de cabeceras comunes

- Se ha implementado un interceptor funcional en `interceptors/common-headers.interceptor.ts` que clona cada petición saliente y añade cabeceras estándar como `Content-Type: application/json` y `Accept-Language: es-ES`.
- El interceptor se registra en la configuración global de HttpClient, asegurando que todas las peticiones compartan las mismas cabeceras sin repetir lógica en cada servicio. Esta capa común también facilita añadir en el futuro otras cabeceras (por ejemplo autenticación o versión de API) sin tocar todos los servicios.

---

## 3. Servicio base `ApiService`

### 3.1. Responsabilidad y ubicación

- `ApiService` se ha definido en `services/api.service.ts` como servicio singleton (`providedIn: 'root'`) y actúa como capa base para todo el acceso HTTP.
- Centraliza la `baseUrl` de la API y encapsula la inyección de `HttpClient`, evitando que los servicios de dominio tengan que repetir esta configuración.

### 3.2. Métodos genéricos

- Expone métodos genéricos `get<T>`, `post<T>`, `put<T>` y `delete<T>` que reciben rutas relativas y parámetros opcionales, devolviendo siempre `Observable<T>` tipados.
- Servicios específicos como `BudgetsHttpService` extienden de `ApiService`, reutilizando estos métodos genéricos y manteniendo un estilo consistente en todas las llamadas HTTP. De esta forma, los servicios de dominio se centran en “qué” datos necesitan y no en “cómo” se construye la petición.

---

## 4. Operaciones CRUD completas sobre presupuestos

En esta parte se ha implementado en el frontend Angular un CRUD completo para el recurso principal **Presupuesto**, consumiendo la API REST de Spring Boot bajo `/api/presupuestos` para lectura, creación, actualización y eliminación de datos.

### 4.1. Recurso principal y API usada

- Recurso principal en cliente: `Budget`, equivalente a `PresupuestoDTO` del backend (id, título, precio, descripción, fecha, clienteId).
- API REST utilizada: backend `korporativo-backend` del módulo DWES, expuesto en `http://localhost:8080/api/presupuestos` con los endpoints GET, POST, PUT y DELETE.

### 4.2. GET: listado y detalle

- **Listado**  
  - Componente: `BudgetsList` (`src/app/pages/budgets/budgets-list.ts`).
  - Método de servicio: `BudgetsHttpService.getBudgets(params?: { page?: number; limit?: number })` → `GET /api/presupuestos?page=...&limit=...`.
  - El componente mantiene un `signal<Budget[]>` para el listado y señales `error`/`info` para mensajes de estado (errores de carga y confirmación de borrado vía `queryParams.deleted`), además de señales `page` y `limit` para controlar la página actual y el tamaño de página.
  - Los botones “Página anterior” y “Siguiente página” actualizan `page` y vuelven a llamar a `getBudgets({ page, limit })`, dejando preparado el patrón de paginación mediante query params.

- **Detalle**  
  - Componente: `BudgetDetail` (`src/app/pages/budgets/budget-detail.ts`).
  - Lee el parámetro `:id` y utiliza `BudgetsHttpService.getBudgetById(id)` → `GET /api/presupuestos/{id}`.
  - Controla `loading` y `error` con signals y, cuando la carga tiene éxito, inicializa un formulario reactivo con los datos del presupuesto.

### 4.3. POST: creación de presupuestos

- Componente: `BudgetCreate` (`src/app/pages/budgets/budget-create.ts`), accesible desde `/presupuestos/nuevo` y enlazado desde el listado con “Nuevo presupuesto”.
- Formulario reactivo basado en `CreateBudgetDto` (`titulo`, `precio`, `descripcion`, `fecha`, `clienteId`) con validaciones básicas de requerido y mínimos.
- En el envío se llama a `BudgetsHttpService.createBudget(body)` → `POST /api/presupuestos` y, tras recibir el recurso creado, se navega a `/presupuestos/{id}` para mostrar su detalle.

### 4.4. PUT: actualización de presupuestos

- La edición se realiza desde `BudgetDetail`, reutilizando el presupuesto cargado para rellenar el formulario reactivo.
- Al pulsar “Guardar cambios”, `onSave()` construye un `CreateBudgetDto` desde `form.value`, marca `saving` en `true` y llama a `BudgetsHttpService.updateBudget(id, body)` → `PUT /api/presupuestos/{id}`.
- Con la respuesta se actualiza la señal `budget` y se desactiva el estado de guardado; en caso de error se informa mediante la señal `error`.

### 4.5. DELETE: eliminación de presupuestos

- Botón “Eliminar presupuesto” en `BudgetDetail`, junto al de guardar.
- `onDelete()` pide confirmación y, si el usuario acepta, llama a `BudgetsHttpService.deleteBudget(id)` → `DELETE /api/presupuestos/{id}`.
- Tras borrar, se navega a `/presupuestos` con `queryParams: { deleted: id }`. `BudgetsList` detecta este parámetro en `queryParamMap` y muestra un mensaje informativo “Presupuesto X eliminado correctamente.” mediante la señal `info`.

### 4.6. Resumen de cumplimiento

Para el recurso principal **Presupuesto**, el frontend Angular implementa las cuatro operaciones CRUD contra la API REST de Spring Boot:

- Listar: `BudgetsList` + `getBudgets`.
- Ver detalle: `BudgetDetail` + `getBudgetById`.
- Crear: `BudgetCreate` + `createBudget`.
- Actualizar: `BudgetDetail` + `updateBudget`.
- Eliminar: `BudgetDetail` + `deleteBudget` con feedback en `BudgetsList`.

---

## 5. Manejo de respuestas y errores en presupuestos

Para el módulo de presupuestos se han tipado tanto las respuestas como las peticiones usando tres interfaces principales: `Budget` (modelo de datos), `CreateBudgetDto` (cuerpo de creación/edición) y `BudgetApiError` (errores de la API). Esto mantiene el contrato alineado con `PresupuestoDTO` del backend de Spring Boot y evita el uso de `any` en el servicio y en los componentes que lo consumen.

Todas las funciones del `BudgetsHttpService` (`getBudgets`, `getBudgetById`, `createBudget`, `updateBudget`, `deleteBudget`) usan operadores de RxJS para transformar y controlar las respuestas. Primero se pasa cada respuesta por `map`, delegando en un método privado `mapBudget` que actúa como punto único donde se puede adaptar el formato de fechas o añadir campos derivados antes de entregarlos a la vista.

Después se encadena `catchError`, que delega en un `handleError` común encargado de convertir el error HTTP en un `BudgetApiError` tipado con el código de estado (`status`), un mensaje y un tipo lógico de error (`network`, `validation`, `server` o `unknown`). Esto permite que la capa de presentación sepa qué tipo de problema se ha producido.

En las operaciones de lectura (`getBudgets` y `getBudgetById`) se aplica además `retry` para reintentar automáticamente la petición en caso de fallos transitorios de red, evitando que un error puntual rompa la experiencia de usuario. En componentes como `BudgetCreate`, el `subscribe` recibe directamente un `BudgetApiError` en la rama de error y puede mostrar mensajes diferenciados según el tipo (problemas de validación de datos, de conectividad o errores internos del servidor), en lugar de un mensaje genérico único.

---

## 6. Formatos de datos y query params

En el acceso a la API se utiliza JSON como formato principal tanto para las peticiones como para las respuestas, tipado con las interfaces `Budget` y `CreateBudgetDto` en el servicio `BudgetsHttpService`. Se ha centralizado la construcción de URLs y la configuración de cabeceras comunes (por ejemplo, `Content-Type: application/json`) en `ApiService` y en el interceptor HTTP global, de modo que los servicios de dominio solo se preocupan de los datos y no de los detalles de transporte.

Para el listado de presupuestos se ha añadido soporte de parámetros de consulta (`query params`) con la interfaz `BudgetQueryParams`. El método `getBudgets(params?: BudgetQueryParams)` acepta opcionalmente `page` y `limit`, que se envían como `?page=1&limit=10` al backend. El componente `BudgetsList` mantiene el estado de la página actual mediante señales (`page`, `limit`) y llama a `getBudgets({ page: page(), limit: limit() })`, mostrando además botones de “Página anterior” y “Siguiente página” para navegar. Aunque el backend todavía no implementa una paginación real, este patrón deja preparado el uso de JSON combinado con query params para filtros y paginación desde el cliente.

---

## 7. Estados de carga, error y vacío en presupuestos

En el módulo de presupuestos se han contemplado los estados principales de la UI asociados a las peticiones HTTP. `BudgetDetail` utiliza señales de `loading` y `error` para mostrar el formulario solo cuando los datos se han cargado correctamente y avisar en caso de fallo al recuperar un presupuesto. `BudgetsList` mantiene señales `error` e `info` para informar tanto de errores de carga como de operaciones correctas, por ejemplo cuando se elimina un presupuesto y se muestra el mensaje “Presupuesto X eliminado correctamente.” en el listado.

Además, cuando la API devuelve una lista vacía de presupuestos, el componente muestra un estado vacío específico: “No hay presupuestos todavía. Puedes crear el primero desde el botón «Nuevo presupuesto».”, en lugar de dejar la pantalla en blanco. De este modo se diferencian claramente los estados de carga, error, éxito (borrado correcto) y vacío, mejorando la experiencia de usuario alrededor de las operaciones CRUD sobre el recurso Presupuesto.

---

## 8. Catálogo de endpoints de presupuestos

A continuación se recoge el catálogo de endpoints de la API de presupuestos que consume el cliente Angular:

| Método | URL                         | Parámetros             | Descripción                                   |
|--------|-----------------------------|------------------------|-----------------------------------------------|
| GET    | /api/presupuestos          | page, limit (query)    | Lista paginable de presupuestos.             |
| GET    | /api/presupuestos/{id}     | id (path)              | Obtiene el detalle de un presupuesto.        |
| POST   | /api/presupuestos          | cuerpo CreateBudgetDto | Crea un nuevo presupuesto.                   |
| PUT    | /api/presupuestos/{id}     | id (path), cuerpo dto  | Actualiza un presupuesto existente.          |
| DELETE | /api/presupuestos/{id}     | id (path)              | Elimina un presupuesto por su id.            |

---

## 9. Modelos de datos TypeScript

- `Budget`: modelo de lectura usado en la UI (id, titulo, precio, descripcion, fecha, clienteId).
- `CreateBudgetDto`: datos necesarios para crear/editar un presupuesto desde formularios.
- `BudgetApiError`: representa errores HTTP tipados (status, message, type: `network` | `validation` | `server` | `unknown`).
- `BudgetQueryParams`: parámetros de consulta para listado (page, limit).

Estos modelos se usan tanto en los servicios HTTP como en los componentes, lo que ayuda a mantener el contrato con el backend claro y evitar el uso de `any`.

---

## 10. Estrategia de manejo de errores y flujo HTTP

1. El componente (por ejemplo `BudgetsList` o `BudgetDetail`) llama a `BudgetsHttpService`.
2. `BudgetsHttpService` delega en `ApiService` para construir la URL y hacer la llamada HTTP.
3. La respuesta pasa por `map` para adaptar el dato bruto al modelo `Budget`.
4. En caso de error, `catchError` convierte el error HTTP en un `BudgetApiError` tipado.
5. En las peticiones de lectura se aplica `retry` para reintentar errores transitorios de red.
6. El componente recibe el resultado o el `BudgetApiError` y actualiza las señales de `loading`, `error`, `info` o estado vacío en la UI.

Con este flujo, el manejo de errores queda centralizado en los servicios, mientras que los componentes se centran en actualizar el estado de la interfaz en función del resultado.
