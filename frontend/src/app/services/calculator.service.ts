/**
 * Servicio de calculadora de precios con estado reactivo (signals + computed).
 * Calcula precio base, IVA según país, y aplica factores de material/corte/adhesivo.
 */
import { Injectable, computed, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  // --- CONFIGURACIÓN DE PRECIOS BASE ---
  private readonly PRECIO_BASE_CM2 = 0.05; // 0.05€ por cm²

  // --- ESTADO (SIGNALS) ---
  // Medidas
  alto = signal(0);
  ancho = signal(0);
  unidad = signal<'cm' | 'm'>('cm');

  // Configuración
  material = signal<'monomerico' | 'polimerico' | 'transparente' | 'microperforado'>('monomerico');
  corte = signal<'recto' | 'contorno'>('recto');
  adhesivo = signal<'normal' | 'extra'>('normal');

  // Extras
  instalacion = signal<boolean>(false);
  pais = signal<'ES' | 'PT' | 'CANARIAS'>('ES');

  // Control manual del IVA
  incluirIvaManual = signal<boolean>(true);

  constructor() {
    // EFECTO: Si selecciona Canarias, desactivamos el IVA automáticamente.
    // Si vuelve a Península (ES/PT), lo reactivamos por defecto.
    effect(() => {
      if (this.pais() === 'CANARIAS') {
        this.incluirIvaManual.set(false);
      } else {
        this.incluirIvaManual.set(true);
      }
    }, { allowSignalWrites: true });
  }

  // --- CÁLCULOS ---

  // 1. Calcular precio base (Material + Corte + Adhesivo + Instalación)
  precioBase = computed(() => {
    let h = this.alto();
    let w = this.ancho();

    // Normalizar a cm
    if (this.unidad() === 'm') {
      h *= 100;
      w *= 100;
    }

    const area = h * w;
    if (area <= 0) return 0;

    // Factor Material
    let factor = 1;
    switch (this.material()) {
      case 'polimerico': factor = 1.5; break;
      case 'transparente': factor = 1.2; break;
      case 'microperforado': factor = 1.3; break;
      default: factor = 1; // Monomérico
    }

    // Factor Corte (+10% si es contorno)
    if (this.corte() === 'contorno') factor *= 1.10;

    // Factor Adhesivo (+20% si es extra)
    if (this.adhesivo() === 'extra') factor *= 1.20;

    // Coste Material
    let total = area * this.PRECIO_BASE_CM2 * factor;

    // Sumar Instalación (Costo fijo)
    if (this.instalacion()) {
      total += 50;
    }

    return total;
  });

  // 2. Calcular % impuestos según país
  porcentajeIva = computed(() => {
    switch (this.pais()) {
      case 'ES': return 0.21;       // 21%
      case 'PT': return 0.23;       // 23%
      case 'CANARIAS': return 0.00; // 0%
      default: return 0.21;
    }
  });

  // 3. Precio Final (Base + Impuestos CONDICIONALES)
  precioTotal = computed(() => {
    const base = this.precioBase();

    // LÓGICA MODIFICADA:
    // Si el usuario desmarcó la casilla (incluirIvaManual es false), devolvemos la base limpia.
    if (!this.incluirIvaManual()) {
        return Number(base.toFixed(2));
    }

    // Si está marcado, aplicamos el porcentaje correspondiente
    const impuestos = base * this.porcentajeIva();
    return Number((base + impuestos).toFixed(2));
  });
}
