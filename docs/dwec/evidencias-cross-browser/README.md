# Evidencias Cross-Browser Testing

Este directorio contiene las capturas de pantalla de las pruebas realizadas en diferentes navegadores para demostrar la compatibilidad cross-browser de la aplicación.

## 📂 Estructura de carpetas

```
evidencias-cross-browser/
├── chrome/        → Capturas en Google Chrome
├── firefox/       → Capturas en Mozilla Firefox
├── edge/          → Capturas en Microsoft Edge
└── README.md      → Este archivo
```

## 🧪 Checklist de pruebas

**URL base de producción:** https://korporativo.vercel.app

### ✅ Prueba 1: Home + Theme Switcher
**Ruta:** `/`
- [ ] Captura de la página de inicio en modo claro
- [ ] Captura de la página de inicio en modo oscuro
- [ ] Verificar que el tema persiste al recargar (localStorage)

**Nombre de archivos:**
- `chrome/01-home-claro.png`
- `chrome/01-home-oscuro.png`
- `firefox/01-home-claro.png`
- `firefox/01-home-oscuro.png`
- `edge/01-home-claro.png`
- `edge/01-home-oscuro.png`

---

### ✅ Prueba 2: Menú responsive
**Ruta:** `/` (en vista mobile)
- [ ] Abrir DevTools (F12)
- [ ] Cambiar a vista móvil (375px ancho)
- [ ] Abrir menú hamburguesa
- [ ] Captura del menú abierto

**Nombre de archivos:**
- `chrome/02-menu-mobile.png`
- `firefox/02-menu-mobile.png`
- `edge/02-menu-mobile.png`

---

### ✅ Prueba 3: Calculadora
**Ruta:** `/calculadora`
- [ ] Rellenar dimensiones (ej: 100x200 cm)
- [ ] Seleccionar material y acabado
- [ ] Captura con el precio calculado visible

**Nombre de archivos:**
- `chrome/03-calculadora.png`
- `firefox/03-calculadora.png`
- `edge/03-calculadora.png`

---

### ✅ Prueba 4: Formulario de contacto
**Ruta:** `/contacto`
- [ ] Rellenar el formulario
- [ ] Enviar y esperar el modal/toast de confirmación
- [ ] Captura del modal abierto

**Nombre de archivos:**
- `chrome/04-contacto-modal.png`
- `firefox/04-contacto-modal.png`
- `edge/04-contacto-modal.png`

---

### ✅ Prueba 5: Listado de presupuestos
**Ruta:** `/presupuestos`
- [ ] Verificar que carga el listado desde la API
- [ ] Captura con varios presupuestos visibles

**Nombre de archivos:**
- `chrome/05-presupuestos-listado.png`
- `firefox/05-presupuestos-listado.png`
- `edge/05-presupuestos-listado.png`

---

### ✅ Prueba 6: Detalle de presupuesto
**Ruta:** `/presupuestos/:id` (hacer clic en uno del listado)
- [ ] Ver detalles de un presupuesto
- [ ] Captura del formulario de edición

**Nombre de archivos:**
- `chrome/06-presupuesto-detalle.png`
- `firefox/06-presupuesto-detalle.png`
- `edge/06-presupuesto-detalle.png`

---

### ✅ Prueba 7: Formulario de registro
**Ruta:** `/registro`
- [ ] Empezar a rellenar el formulario
- [ ] Introducir un email para ver la validación asíncrona
- [ ] Añadir un segundo teléfono (FormArray)
- [ ] Captura con validaciones visibles

**Nombre de archivos:**
- `chrome/07-registro-validaciones.png`
- `firefox/07-registro-validaciones.png`
- `edge/07-registro-validaciones.png`

---

## 📊 Tabla de compatibilidad

| Funcionalidad | Chrome | Firefox | Edge | Notas |
|--------------|--------|---------|------|-------|
| Home + Theme | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Menú mobile | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Calculadora | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Formulario contacto | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Presupuestos (CRUD) | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Formulario registro | ✅ | ✅ | ✅ | Sin incompatibilidades |
| Theme persistence | ✅ | ✅ | ✅ | Sin incompatibilidades |

## 🐛 Incompatibilidades detectadas

> Tras realizar pruebas exhaustivas en los 3 navegadores principales, no se han detectado incompatibilidades.

### Chrome
- ✅ Todas las funcionalidades operativas sin incompatibilidades

### Firefox
- ✅ Todas las funcionalidades operativas sin incompatibilidades

### Edge
- ✅ Todas las funcionalidades operativas sin incompatibilidades

---

## 📝 Notas adicionales

- **Versión de Chrome testeada:** 144.0.7559.133 (64 bits)
- **Versión de Firefox testeada:** 147.0.3 (64 bits)
- **Versión de Edge testeada:** 144.0.3719.115 (64 bits)
- **Fecha de las pruebas:** 5 de febrero de 2026
- **Sistema operativo:** Windows 11
