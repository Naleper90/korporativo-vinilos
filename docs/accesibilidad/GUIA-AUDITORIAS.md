# Guía para completar auditorías de accesibilidad

Este documento te guía paso a paso para completar las secciones pendientes de `docs/accesibilidad/README.md`.

---

## ⏳ Secciones pendientes

Las siguientes secciones requieren que ejecutes herramientas y tests manuales:

- **Sección 3**: Auditoría inicial (Lighthouse, WAVE, TAW)
- **Sección 6**: Tests manuales (teclado, NVDA, cross-browser)
- **Sección 7.1-7.3**: Resultados finales tras correcciones

---

## 📋 Auditorías con herramientas automáticas

### 1. Lighthouse (Google Chrome DevTools)

**Pasos:**

1. Abre tu aplicación en Chrome: `http://localhost:4200`
2. Abre DevTools: `F12` o `Ctrl + Shift + I`
3. Ve a la pestaña **"Lighthouse"**
4. Configuración:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Dispositivo: **Desktop** (primero) y **Mobile** (después)
5. Click en **"Analyze page load"**
6. Espera a que termine el análisis
7. Guarda captura de pantalla: `docs/accesibilidad/capturas/lighthouse-despues.png`

**Datos a copiar:**
- Puntuación de Accessibility (ej: 93/100)
- Puntuación de Performance
- Puntuación de Best Practices
- Puntuación de SEO

---

### 2. WAVE (Web Accessibility Evaluation Tool)

**Pasos:**

1. Instala la extensión WAVE:
   - Chrome: https://chrome.google.com/webstore (busca "WAVE Evaluation Tool")
   - Firefox: https://addons.mozilla.org/firefox (busca "WAVE")

2. Abre tu aplicación: `http://localhost:4200`

3. Click en el icono de WAVE en la barra de extensiones

4. Espera a que analice la página

5. Revisa los resultados:
   - **Errors** (Errores críticos en rojo)
   - **Alerts** (Advertencias en amarillo)
   - **Features** (Características accesibles en verde)
   - **Structural Elements** (Elementos semánticos)
   - **ARIA** (Atributos ARIA)

6. Guarda captura: `docs/accesibilidad/capturas/wave-despues.png`

**Datos a copiar:**
- Cantidad de Errors
- Cantidad de Alerts
- Cantidad de Features
- Cantidad de Structural Elements
- Cantidad de ARIA

---

### 3. TAW (Test de Accesibilidad Web)

**Pasos:**

1. Accede a: https://www.tawdis.net/?lang=es

2. **Opción A** (si tu app está publicada):
   - Introduce la URL de producción: `https://korporativo.vercel.app`
   - Click en "Analizar"

3. **Opción B** (si solo tienes localhost):
   - Copia el código HTML de tu página (Click derecho → Ver código fuente → Copiar todo)
   - En TAW, selecciona "HTML" y pega el código
   - Click en "Analizar"

4. Revisa los resultados por nivel:
   - **Nivel A**: Problemas, Advertencias, No verificado
   - **Nivel AA**: Problemas, Advertencias, No verificado
   - **Nivel AAA**: (opcional)

5. Guarda captura del informe: `docs/accesibilidad/capturas/taw-despues.png`

**Datos a copiar:**
- Cantidad de Problemas (Nivel A y AA)
- Cantidad de Advertencias (Nivel A y AA)
- Cantidad de No verificado

---

## ⌨️ Tests manuales

### Test 1: Navegación por teclado

**Objetivo:** Verificar que toda la funcionalidad es accesible solo con teclado.

**Pasos:**

1. Recarga la página: `http://localhost:4200`
2. **NO USES EL RATÓN** durante este test
3. Usa solo estas teclas:
   - `Tab`: Avanzar al siguiente elemento
   - `Shift + Tab`: Retroceder al elemento anterior
   - `Enter` / `Space`: Activar botón o enlace
   - `Esc`: Cerrar modal
   - `Arrow keys`: Navegar dentro de componentes (si aplica)

**Checklist a verificar:**

```
[ ] El skip link "Saltar al contenido principal" aparece al presionar Tab
[ ] Puedes navegar por el menú principal (Inicio, Calculadora, Contacto)
[ ] El logo tiene foco visible y es clicable con Enter
[ ] El botón de tema (🌙/🌞) tiene foco visible
[ ] El menú hamburguesa (móvil) es navegable por teclado
[ ] El carrusel de imágenes es navegable (botones ← →)
[ ] Los indicadores del carrusel (dots) son accesibles
[ ] Todos los campos del formulario de contacto tienen foco visible
[ ] El botón "Enviar" del formulario es activable con Enter/Space
[ ] El modal de confirmación se puede cerrar con Esc o con botón
[ ] La calculadora: todos los inputs tienen foco visible
[ ] Los botones tipo "chip" (material, corte, adhesivo) son navegables
[ ] El foco NUNCA se pierde (outline siempre visible)
[ ] El orden de tabulación es lógico (de arriba a abajo, izquierda a derecha)
```

**Apunta cualquier problema detectado.**

---

### Test 2: NVDA (Lector de pantalla)

**Solo si tienes Windows y NVDA instalado:**

1. Descarga NVDA (gratis): https://www.nvaccess.org/download/
2. Instala y abre NVDA
3. Abre tu aplicación: `http://localhost:4200`
4. Cierra los ojos (o apaga la pantalla)
5. Navega solo con teclado y escucha lo que anuncia NVDA

**Checklist a verificar:**

```
[ ] NVDA anuncia el idioma como "español"
[ ] Al enfocar el logo, anuncia "Korporativo, enlace"
[ ] Al enfocar el skip link, anuncia "Saltar al contenido principal, enlace"
[ ] Los encabezados se anuncian con su nivel (h1, h2, h3)
[ ] Las imágenes del carrusel se anuncian con su texto alt
[ ] Los botones se anuncian como "botón" + su etiqueta
[ ] Los campos de formulario anuncian su label + tipo
[ ] Los errores de validación se anuncian automáticamente
[ ] El contador del carrusel anuncia "1 de 5", "2 de 5", etc.
[ ] Las notificaciones toast se anuncian automáticamente
```

**Apunta cualquier problema detectado.**

---

### Test 3: Cross-browser (Navegadores)

**Objetivo:** Verificar que la accesibilidad funciona en Chrome, Firefox y Edge.

**Pasos:**

1. Abre la aplicación en **Chrome**: `http://localhost:4200`
   - Navega con teclado
   - Verifica foco visible
   - Guarda captura: `docs/accesibilidad/capturas/chrome.png`

2. Abre la aplicación en **Firefox**: `http://localhost:4200`
   - Navega con teclado
   - Verifica foco visible
   - Guarda captura: `docs/accesibilidad/capturas/firefox.png`

3. Abre la aplicación en **Edge**: `http://localhost:4200`
   - Navega con teclado
   - Verifica foco visible
   - Guarda captura: `docs/accesibilidad/capturas/edge.png`

**Checklist a verificar en cada navegador:**

```
[ ] El outline de foco es visible (verde lima, 2px)
[ ] El skip link aparece al presionar Tab
[ ] Los formularios funcionan correctamente
[ ] El carrusel CSS funciona sin JavaScript
[ ] No hay diferencias visuales importantes entre navegadores
```

---

## 📝 Completar documentación

Una vez hayas ejecutado todas las auditorías y tests:

1. Abre `docs/accesibilidad/README.md`

2. Completa **Sección 3** con los resultados de Lighthouse, WAVE y TAW:
   - Pega las puntuaciones en las tablas
   - Describe los principales hallazgos

3. Completa **Sección 6** con los resultados de los tests manuales:
   - Marca los checkboxes
   - Anota cualquier problema encontrado

4. Completa **Sección 7.1-7.3** con los resultados finales:
   - Compara las puntuaciones antes/después (si tienes "antes")
   - Actualiza las tablas de mejora

---

## 💡 Consejos

- **Las herramientas automáticas NO detectan todo:** Los tests manuales son imprescindibles.
- **Si Lighthouse da menos de 90 en Accessibility**, revisa los problemas que reporta y corrígelos.
- **Si WAVE muestra errores en rojo**, son críticos y deben corregirse.
- **Si no tienes NVDA**, puedes omitir esa parte o usar VoiceOver (Mac) / JAWS (Windows).
- **Guarda todas las capturas** en `docs/accesibilidad/capturas/` con nombres claros.

---

## ✅ Checklist final

Antes de dar por terminado el proyecto de accesibilidad:

```
[ ] He ejecutado Lighthouse y guardado captura
[ ] He ejecutado WAVE y guardado captura
[ ] He ejecutado TAW y guardado captura
[ ] He navegado toda la web solo con teclado
[ ] He probado con NVDA (o equivalente)
[ ] He probado en Chrome, Firefox y Edge
[ ] He completado las secciones 3, 6 y 7 en README.md
[ ] Todas las capturas están en docs/accesibilidad/capturas/
[ ] He revisado que el documento final es coherente
```

---

**¡Buena suerte con las auditorías!** 🚀

Si encuentras problemas que no sabes cómo solucionar, anota los errores y consulta la documentación WCAG: https://www.w3.org/WAI/WCAG21/quickref/
