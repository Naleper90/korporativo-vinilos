import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  // --- CONFIGURACIÓN DE PRECIOS ---
  private readonly PRECIO_BASE = 0.05; // €/cm2
  private readonly IVA_ESP = 0.21;

  // --- ESTADO (Signals) ---
  alto = signal(0);
  ancho = signal(0);
  unidad = signal<'cm' | 'm'>('cm');

  // Materiales
  material = signal<'monomerico' | 'polimerico' | 'transparente' | 'microperforado'>('monomerico');

  // Nuevos campos de lógica
  corte = signal<'recto' | 'contorno'>('recto');
  adhesivo = signal<'normal' | 'extra'>('normal');
  instalacion = signal<boolean>(false);

  // --- CÁLCULOS ---
  precioSinIva = computed(() => {
    let h = this.alto();
    let w = this.ancho();

    // 1. Normalizar a cm
    if (this.unidad() === 'm') {
      h *= 100;
      w *= 100;
    }

    const area = h * w;
    if (area <= 0) return 0;

    // 2. Factor Material
    let factor = 1;
    switch (this.material()) {
      case 'polimerico': factor = 1.5; break;
      case 'transparente': factor = 1.2; break;
      case 'microperforado': factor = 1.3; break;
      default: factor = 1;
    }

    // 3. Factor Corte (+10% si es contorno)
    if (this.corte() === 'contorno') factor += 0.1;

    // 4. Factor Adhesivo (+20% si es extra)
    if (this.adhesivo() === 'extra') factor += 0.2;

    let total = area * this.PRECIO_BASE * factor;

    // 5. Instalación (Ejemplo: 50€ fijos si se marca)
    if (this.instalacion()) {
      total += 50;
    }

    return total;
  });

  precioTotal = computed(() => {
    return this.precioSinIva() * (1 + this.IVA_ESP);
  });
}
