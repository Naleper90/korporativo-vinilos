import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { CalculatorService } from '../../services/calculator.service';
import { BudgetService } from '../../services/budgets.service';
import { LoadingService } from '../../services/loading'; // <--- RUTA CORRECTA

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent {
  // Inyecciones
  private router = inject(Router);
  private budgetService = inject(BudgetService);
  private loadingService = inject(LoadingService); // <--- INYECCIÓN NUEVA
  public calc = inject(CalculatorService);

  // Estado visual
  mostrarErrores = signal(false);

  // --- NAVEGACIÓN ---
  onBack() {
    this.router.navigate(['/']);
  }

  // --- ACCIÓN PRINCIPAL: GUARDAR PRESUPUESTO ---
  onSaveBudget() {
    // 1. Validar
    if (this.calc.alto() === 0 || this.calc.ancho() === 0) {
      this.mostrarErrores.set(true);
      return;
    }
    this.mostrarErrores.set(false);

    // 2. Preparar datos
    const presupuestoFinal = {
      dimensiones: `${this.calc.ancho()}x${this.calc.alto()} ${this.calc.unidad()}`,
      material: this.calc.material(),
      corte: this.calc.corte(),
      adhesivo: this.calc.adhesivo(),
      instalacion: this.calc.instalacion(),
      precioTotal: this.calc.precioTotal()
    };

    console.log('📡 Enviando al backend...', presupuestoFinal);

    // 3. ACTIVAR SPINNER GLOBAL
    this.loadingService.show(); // <--- START LOADING

    // 4. LLAMADA AL SERVIDOR
    this.budgetService.createBudget(presupuestoFinal).subscribe({
      next: (response) => {
        this.loadingService.hide(); // <--- STOP LOADING
        console.log('✅ Respuesta:', response);
        alert(`¡Presupuesto guardado con éxito!`);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loadingService.hide(); // <--- STOP LOADING (SIEMPRE)
        console.error('❌ Error:', error);
        alert('Hubo un error al conectar con el servidor.');
      }
    });
  }

  // --- HELPERS PARA INPUTS Y LÓGICA ---
  updateAlto(valor: string) {
    const v = Number(valor);
    if (v >= 0) {
      this.calc.alto.set(v);
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
