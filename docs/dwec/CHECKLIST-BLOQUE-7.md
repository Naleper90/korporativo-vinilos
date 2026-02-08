# ✅ Checklist Bloque 7 - DWEC

**Proyecto:** Korporativo Vinilos  
**Fecha última actualización:** 5 de febrero de 2026

---

## 📊 Puntuación estimada actual: **10-12 / 32 puntos**

---

## 7.1 Cross-browser asíncrono (10 puntos)

**Puntuación actual estimada: 8-9 / 10 puntos** ⭐

### ✅ Completado

- [x] **`.browserslistrc` creado** con targets explícitos
- [x] **Chrome probado** (versión 144.0.7559.133) - 7 capturas
- [x] **Firefox probado** (versión 147.0.3) - 7 capturas
- [x] **Edge probado** (versión 144.0.3719.115) - 7 capturas
- [x] **Tabla de compatibilidad** documentada
- [x] **Incompatibilidades documentadas** (ninguna detectada)
- [x] **Polyfills básicos** (zone.js incluido)
- [x] **Angular compila targets** según .browserslistrc
- [x] **Evidencias organizadas** (21 capturas en docs/dwec/evidencias-cross-browser/)
- [x] **Documentación completa** (Fase 7 en DOCUMENTACION.md)

### ❌ Falta (para 10/10)

- [ ] **Safari probado** (requiere Mac - no disponible)
  - **Alternativa:** Documentar limitación y justificar que no se tiene Mac
  - **Nota:** Con Chrome + Firefox + Edge ya tenemos cobertura suficiente para 8-9 pts

### 📝 Para mejorar

- Añadir nota en documentación justificando ausencia de Safari por falta de hardware Mac

---

## 7.2 Depuración librerías (22 subpuntos → 10 puntos)

**Puntuación actual estimada: 8-9 / 22 subpuntos → 4 puntos** ⚠️

---

### 📦 **Bloque A: Testing (11 subpuntos)** - 0/11 ❌

#### Tests Unitarios (6 pts)

- [ ] **3 componentes con tests completos**
  - [ ] Tests de: `BudgetsList`, `BudgetDetail`, `Calculator`
  - [ ] No solo `it('should create')`, tests de funcionalidad real
- [ ] **3 servicios con tests completos**
  - [ ] Tests de: `BudgetStateService`, `BudgetsHttpService`, `ThemeService`
  - [ ] Mocks de HttpClient donde sea necesario
- [ ] **Pipes testeados** (si existen custom pipes)
- [ ] **Coverage >50%**
  - [ ] Ejecutar `ng test --code-coverage`
  - [ ] Generar reporte HTML
  - [ ] Documentar % de coverage

#### Tests de Integración (5 pts)

- [ ] **Flujos completos testeados** (ej: crear presupuesto end-to-end)
- [ ] **HTTP mocks** con `HttpTestingController`
- [ ] **Formularios reactivos** testeados (validaciones, submit)
- [ ] **Routing** testeado (navegación entre páginas)
- [ ] **Guards** testeados (authGuard, pendingChangesGuard)

**Estado actual:** Solo archivos `.spec.ts` stubs generados automáticamente

---

### ⚡ **Bloque B: Optimización (4 subpuntos)** - 2/4 ⚠️

- [x] **Lazy loading** implementado (área usuario con `loadChildren`)
- [x] **Tree-shaking** (automático en Angular build prod)
- [ ] **Lighthouse >80** en las 4 categorías
  - [ ] Performance
  - [ ] Accessibility
  - [ ] Best Practices
  - [ ] SEO
  - [ ] **Acción:** Ejecutar Lighthouse en producción y documentar
- [ ] **Bundles <500KB** verificado
  - [ ] **Acción:** Ejecutar `ng build --stats-json` y analizar tamaños

---

### 🏗️ **Bloque C: Build (4 subpuntos)** - 4/4 ✅

- [x] **`ng build --configuration production`** funciona sin errores
- [x] **Sin errores ni warnings** en build
- [x] **Source maps** configurados (desarrollo: sí, producción: no)
- [x] **Base href** correcto para despliegue

---

### 🚀 **Bloque D: Despliegue (4 subpuntos)** - 4/4 ✅

- [x] **URL en producción** funcionando: https://korporativo.vercel.app
- [x] **Rutas funcionan** (SPA routing correcto)
- [x] **HTTP en producción** (API conectada correctamente)
- [x] **SPA redirects** configurados (servidor redirige /* a index.html)

---

### 📚 **Bloque E: Documentación (6 subpuntos)** - 4/6 ⚠️

- [x] **README.md** con setup, stack e instalación
- [x] **Arquitectura documentada** (1517 líneas en DOCUMENTACION.md)
- [x] **Deploy documentado** (URL y pasos básicos en README)
- [x] **Decisiones técnicas** documentadas (Signals vs NgRx, etc.)
- [ ] **CHANGELOG.md** con historial de versiones
  - **Acción:** Crear archivo con versiones y cambios
- [ ] **Guía de contribución** (CONTRIBUTING.md o sección en README)
  - **Acción:** Añadir sección con normas de código, commits, etc.

---

## 🎯 Plan de acción recomendado

### **Prioridad 1: Testing (impacto +6-8 puntos)**

1. Arreglar configuración de testing en `angular.json`
2. Escribir 3 tests de componentes completos
3. Escribir 3 tests de servicios completos
4. Generar reporte de coverage >50%
5. Documentar resultados

**Estimación:** 3-4 horas

---

### **Prioridad 2: Lighthouse + Bundles (impacto +2 puntos)**

1. Ejecutar Lighthouse en https://korporativo.vercel.app
2. Capturar resultados (>80 en todas las categorías)
3. Analizar tamaños de bundles con `ng build --stats-json`
4. Documentar resultados

**Estimación:** 30 minutos

---

### **Prioridad 3: CHANGELOG + Contribución (impacto +2 puntos)**

1. Crear `CHANGELOG.md` con historial de versiones
2. Añadir guía de contribución al README
3. Documentar convenciones de código

**Estimación:** 30 minutos

---

## 📈 Proyección de puntuación final

| Escenario | 7.1 | 7.2 | Total | Nota |
|-----------|-----|-----|-------|------|
| **Actual** | 8-9 | 4 | **12-13/32** | Insuficiente |
| **Con Tests** | 8-9 | 8 | **16-17/32** | Suficiente |
| **Con Tests + Lighthouse** | 8-9 | 9 | **17-18/32** | Bien |
| **Todo completado** | 9 | 10 | **19/32** | Notable |
| **Todo + Safari** | 10 | 10 | **20/32** | Notable alto |

---

## 📝 Notas importantes

### Sobre Safari
- **Problema:** No tienes Mac para probar Safari
- **Solución:** Documentar limitación y justificar
- **Impacto:** -1 punto máximo (de 10 a 9 en 7.1)

### Sobre los tests
- **Los archivos `.spec.ts` existen** pero solo tienen tests stub (`it('should create')`)
- **Se necesita:** Tests reales de funcionalidad, no solo creación
- **Mayor impacto:** Este es el bloque que más puntos aporta (+6-8 puntos)

### Sobre el build de tests
- **Problema actual:** `ng test` falla (builder no encontrado)
- **Hay que arreglar:** Configuración en `angular.json`
- **Una vez arreglado:** Se pueden ejecutar y generar coverage

---

## 🔄 Actualización de checklist

**Instrucciones:** Marca con `[x]` cada tarea completada y actualiza la fecha.

**Última revisión:** 5 de febrero de 2026
