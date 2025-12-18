# Fase 1 · Arquitectura de eventos y componentes interactivos

## 1. Introducción

En esta fase se ha implementado la capa de interacción de la aplicación Angular: gestión de eventos, manipulación del DOM desde componentes, theme switcher y varios componentes interactivos (menú hamburguesa, modal de contacto y tabs informativos).

---

## 2. Arquitectura general de eventos

### **2.1. Tipos de eventos usados**

- **Eventos de ratón**
  - `click`: botones (menú, cerrar modal, enviar formulario, tabs, theme toggle).
  - `document:click`: cierre del menú mobile al hacer clic fuera.

- **Eventos de formularios**
  - `ngSubmit`: envío del formulario de contacto.
  - `Output` personalizado: emisión de `formSubmitted` desde el componente `ContactForm` al componente `Contact`.

- **Eventos de teclado (parcial)**
  - Preparado para usar `keydown`/`keyup` (por ahora no se usa `ESC`, pero la arquitectura lo permite).

### **2.2. Flujo de eventos principales**

#### **2.2.1. Menú hamburguesa**

1. El usuario pulsa el botón hamburguesa.
2. `Header`:
   - Hace `event.stopPropagation()` para que el `document:click` no cierre inmediatamente el menú.
   - Alterna `isMobileMenuOpen` entre `true/false`.
   - Llama a `updateMobileMenuDOM()`.
3. `updateMobileMenuDOM()` añade o quita la clase `layout-header__nav-mobile--open` en el elemento referenciado con `@ViewChild('mobileMenu')` (usa `ElementRef` para manipular clases del DOM).
4. Un `@HostListener('document:click')` escucha clics globales:
   - Si `isMobileMenuOpen` es `true` y el clic no viene del botón, se pone a `false` y se actualiza el DOM de nuevo.
5. El resultado es un menú mobile que se abre/cierra con animación y se cierra al hacer clic en cerrar.

#### **2.2.2. Theme switcher**

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

#### **2.2.3. Formulario de contacto y modal**

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

#### **2.2.4. Tabs en la página de inicio**

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

### **3.1. Menú hamburguesa (header)**

- **Ubicación**: `components/layout/header/`.
- **Funcionalidad**:
- Abre/cierra el menú mobile con botón hamburguesa.
- Cierra al hacer clic fuera (document click).
- Usa `ViewChild + ElementRef` para añadir/quitar clases CSS.
- Usa `stopPropagation` para evitar cierres no deseados.

### **3.2. Modal de contacto / toast de confirmación**

- **Ubicación**: `modal/` + uso en `pages/contact/`.
- **Funcionalidad**:
- Se abre al enviar correctamente el formulario de contacto.
- Muestra un mensaje de confirmación.
- Se cierra con botón “Cerrar”.
- Usa `@ViewChild` para que el padre controle la apertura.

### **3.3. Tabs informativos en Home**

- **Ubicación**: `components/shared/tabs/`.
- **Funcionalidad**:
- Muestra varias pestañas (Redes sociales, Soporte, Nuestro estudio).
- Cambia el contenido al hacer clic en cada pestaña.
- Usa `@Input()` para recibir configuración y estado interno `activeTab`.

### **3.4. Theme Switcher**

- **Ubicación**: `services/theme.service.ts` + botón en `header`.
- **Funcionalidad**:
- Alterna entre tema claro/oscuro.
- Persistencia en `localStorage`.
- Aplica el tema en el arranque.
- Expone un observable `theme$` para que otros componentes reaccionen.

---

## 4. Manipulación del DOM

### **4.1. Acceso al DOM**

- `Header` usa `@ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;` para:
- Añadir/quitar la clase `layout-header__nav-mobile--open`.

### **4.2. Control de visibilidad estructural**

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

## **1. Introducción**

En esta fase se ha implementado la capa de servicios Angular para comunicación entre componentes hermanos, sistema global de notificaciones (toasts) y gestión centralizada de estados de carga (spinner).

---

## **2. Arquitectura general de servicios**

### **2.1. Tipos de servicios usados**

- **LoadingService**: Gestión global de estados de carga
  - `BehaviorSubject<boolean>` para estado reactivo
  - Métodos `show()/hide()` públicos

- **NotificationsService**: Sistema de toasts/notificaciones
  - `Subject<Notification[]>` para array de mensajes
  - Tipos: `success`, `error`, `info`, `warning`

- **Patrón Observable/Subject**: Comunicación reactiva entre componentes

### **2.2. Flujo de eventos principales**

#### **2.2.1. LoadingService (Spinner global)**

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
#### **2.2.2. NotificationsService (Toasts)**

1. `ContactComponent` llama `notificationsService.success('Enviado')`
2. `NotificationsService` añade toast al array `notifications$`
3. `AppComponent` suscrito renderiza `<app-toast>` por cada notif
4. Auto-dismiss configurable (3-7s por tipo)

```
Contact → NotificationsService → AppComponent → AppToast ×N
```

---

## **3. Servicios implementados**

### **3.1. LoadingService**
```
src/app/services/loading.ts
```

- **Ubicación**: `services/loading.service.ts`
- **Funcionalidad**: Control global de spinner
- **Consumidor**: `AppSpinnerComponent`

### **3.2. NotificationsService**
```
src/app/services/notification.ts
```

- **Ubicación**: `services/notification.ts`
- **Funcionalidad**: Toasts multinotificación
- **Consumidores**: `AppComponent` → `AppToastComponent`

### **3.3. Componentes de presentación**
```
src/app/components/shared/spinner/spinner.ts
src/app/components/shared/toast/toast.ts
src/app/app.ts
```

---

## **4. Manipulación de estado reactivo**

### **4.1. Suscripciones en componentes**

- `AppSpinner`: `loading$ = this.loadingService.loading$`
- `AppComponent`: `notifications = this.notificationsService.notifications$`
- `*ngIf="(loading$ | async)"` y `*ngFor="let notif of notifications"`

### **4.2. Control de visibilidad estructural**

- Spinner: `*ngIf` crea/destruye overlay completo
- Toasts: `*ngFor` renderiza dinámicamente cada notificación
- Auto-dismiss: `setTimeout` en servicio quita toast del array

---

## **5. Tabla de servicios y compatibilidad**

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

### **2.1. Tipos de validadores implementados**

- **Síncronos integrados**: `required`, `email`, `minLength(8)`
- **Síncronos personalizados**: `passwordFuerteValidator`, `telefonoValidator`
- **Cross-field**: `passwordsIgualesValidator` (form-level)
- **Asíncronos**: `emailUnicoValidator()`, `usernameDisponibleValidator()`

### **2.2. Flujo de validación principal**

#### **2.2.1. Formulario reactivo completo**
```
register-form.ts → FormBuilder.group() → 6 controles + FormArray
↓
Validación touched/dirty → Errores condicionales → Submit deshabilitado
```

#### **2.2.2. FormArray teléfonos dinámico**
1. Usuario pulsa **"+ Añadir teléfono"**
2. `addTelefono()` → `telefonosArray.push(new FormGroup())`
3. `*ngFor` renderiza nuevo `<section>` con validación individual
4. `removeTelefono(i)` → `telefonosArray.removeAt(i)`

---

## 3. Validadores implementados

### **3.1. Tabla de validadores**

| **Validador**                  | **Tipo**      | **Descripción**                          | **Ubicación**              |
|--------------------------------|---------------|------------------------------------------|----------------------------|
| `passwordFuerteValidator`      | Síncrono      | ≥8 chars + Mayús/Minús/Números           | `password` control         |
| `passwordsIgualesValidator`    | Cross-field   | Compara `password`/`confirmPassword`     | FormGroup level            |
| `telefonoValidator`            | Síncrono      | 9 dígitos numéricos                      | `phone` + FormArray        |
| `emailUnicoValidator()`        | Asíncrono     | Simula API (800ms delay)                 | `email` control            |
| `usernameDisponibleValidator()`| Asíncrono     | Simula API (600ms delay)                 | `username` control         |

### **3.2. Estados visuales**
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
