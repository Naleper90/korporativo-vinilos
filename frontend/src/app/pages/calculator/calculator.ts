import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent {
  private router = inject(Router);
  public calc = inject(CalculatorService);

  mostrarErrores = signal(false);

  // --- NAVEGACIÓN ---
  onBack() {
    this.router.navigate(['/']);
  }

  // --- ACCIÓN PRINCIPAL: GUARDAR PRESUPUESTO ---
  onSaveBudget() {
    // 1. Validar: Si alto o ancho son 0, error y paramos
    if (this.calc.alto() === 0 || this.calc.ancho() === 0) {
      this.mostrarErrores.set(true);
      return;
    }

    // 2. Si todo OK, limpiamos errores
    this.mostrarErrores.set(false);

    // 3. Preparar datos para Backend (Futuro)
    const presupuestoFinal = {
      dimensiones: `${this.calc.ancho()}x${this.calc.alto()} ${this.calc.unidad()}`,
      material: this.calc.material(),
      corte: this.calc.corte(),
      adhesivo: this.calc.adhesivo(),
      instalacion: this.calc.instalacion(),
      precioTotal: this.calc.precioTotal()
    };

    // 4. Feedback temporal
    console.log('Guardando presupuesto:', presupuestoFinal);
    alert(`¡Presupuesto de ${this.calc.precioTotal().toFixed(2)}€ guardado correctamente!`);

    // Aquí redirigiremos al dashboard o limpiaremos el formulario
    // this.router.navigate(['/dashboard']);
  }

  // --- HELPERS PARA INPUTS Y LOGICA ---

  updateAlto(valor: string) {
    const v = Number(valor);
    if (v >= 0) {
      this.calc.alto.set(v);
      // Si el usuario corrige el 0, quitamos el error visual
      if (v > 0) this.mostrarErrores.set(false);
    }
  }

  updateAncho(valor: string) {
    const v = Number(valor);
    if (v >= 0) {
      this.calc.ancho.set(v);
      if (v > 0) this.mostrarErrores.set(false);
    }
  }

  toggleUnidad() {
    this.calc.unidad.update(u => u === 'cm' ? 'm' : 'cm');
  }

  toggleInstalacion() {
    this.calc.instalacion.update(valor => !valor);
  }
}
