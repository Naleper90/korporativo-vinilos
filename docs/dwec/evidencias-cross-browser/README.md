# Evidencias de pruebas cross-browser

Capturas de pantalla de las pruebas en Chrome, Firefox y Edge para verificar la compatibilidad del proyecto.

## Estructura de carpetas

```
evidencias-cross-browser/
├── chrome/        → Capturas en Google Chrome
├── firefox/       → Capturas en Mozilla Firefox
├── edge/          → Capturas en Microsoft Edge
└── README.md      → Este archivo
```

## Pruebas realizadas

**URL de producción:** https://korporativo.vercel.app

### Prueba 1: Home + Theme Switcher
**Ruta:** `/`
- [x] Captura de la página de inicio en modo claro
- [x] Captura de la página de inicio en modo oscuro
- [x] Verificar que el tema persiste al recargar (localStorage)

**Nombre de archivos:**
- `chrome/01-home-claro.png`
- `chrome/01-home-oscuro.png`
- `firefox/01-home-claro.png`
- `firefox/01-home-oscuro.png`
- `edge/01-home-claro.png`
- `edge/01-home-oscuro.png`

---

### Prueba 2: Menú responsive
**Ruta:** `/` (en vista mobile)
- [x] Abrir DevTools (F12)
- [x] Cambiar a vista móvil (375px ancho)
- [x] Abrir menú hamburguesa
- [x] Captura del menú abierto

**Nombre de archivos:**
- `chrome/02-menu-mobile.png`
- `firefox/02-menu-mobile.png`
- `edge/02-menu-mobile.png`

---

### Prueba 3: Calculadora
**Ruta:** `/calculadora`
- [x] Rellenar dimensiones (ej: 100x200 cm)
- [x] Seleccionar material y acabado
- [x] Captura con el precio calculado visible

**Nombre de archivos:**
- `chrome/03-calculadora.png`
- `firefox/03-calculadora.png`
- `edge/03-calculadora.png`

---

### Prueba 4: Formulario de contacto
**Ruta:** `/contacto`
- [x] Rellenar el formulario
- [x] Enviar y esperar el modal/toast de confirmación
- [x] Captura del modal abierto

**Nombre de archivos:**
- `chrome/04-contacto-modal.png`
- `firefox/04-contacto-modal.png`
- `edge/04-contacto-modal.png`

---

### Prueba 5: Listado de presupuestos
**Ruta:** `/presupuestos`
- [x] Verificar que carga el listado desde la API
- [x] Captura con varios presupuestos visibles

**Nombre de archivos:**
- `chrome/05-presupuestos-listado.png`
- `firefox/05-presupuestos-listado.png`
- `edge/05-presupuestos-listado.png`

---

### Prueba 6: Detalle de presupuesto
**Ruta:** `/presupuestos/:id` (hacer clic en uno del listado)
- [x] Ver detalles de un presupuesto
- [x] Captura del formulario de edición

**Nombre de archivos:**
- `chrome/06-presupuesto-detalle.png`
- `firefox/06-presupuesto-detalle.png`
- `edge/06-presupuesto-detalle.png`

---

### Prueba 7: Formulario de registro
**Ruta:** `/registro`
- [x] Empezar a rellenar el formulario
- [x] Introducir un email para ver la validación asíncrona
- [x] Añadir un segundo teléfono (FormArray)
- [x] Captura con validaciones visibles

**Nombre de archivos:**
- `chrome/07-registro-validaciones.png`
- `firefox/07-registro-validaciones.png`
- `edge/07-registro-validaciones.png`

---

## Resultados de compatibilidad

| Funcionalidad | Chrome | Firefox | Edge | Notas |
|--------------|--------|---------|------|-------|
| Home + Theme | OK | OK | OK | Sin incompatibilidades |
| Menú mobile | OK | OK | OK | Sin incompatibilidades |
| Calculadora | OK | OK | OK | Sin incompatibilidades |
| Formulario contacto | OK | OK | OK | Sin incompatibilidades |
| Presupuestos (CRUD) | OK | OK | OK | Sin incompatibilidades |
| Formulario registro | OK | OK | OK | Sin incompatibilidades |
| Theme persistence | OK | OK | OK | Sin incompatibilidades |

## Incompatibilidades

Tras probar todas las funcionalidades en los 3 navegadores, no encontramos ninguna incompatibilidad. Todo funciona correctamente en Chrome, Firefox y Edge.

---

## Información de las pruebas

- **Versión de Chrome testeada:** 144.0.7559.133 (64 bits)
- **Versión de Firefox testeada:** 147.0.3 (64 bits)
- **Versión de Edge testeada:** 144.0.3719.115 (64 bits)
- **Fecha de las pruebas:** 5 de febrero de 2026
- **Sistema operativo:** Windows 11
