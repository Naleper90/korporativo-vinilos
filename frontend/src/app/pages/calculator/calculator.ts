import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { CalculatorService } from '../../services/calculator.service';
import { BudgetService } from '../../services/budgets.service';

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
  public calc = inject(CalculatorService);

  // Estado visual
  mostrarErrores = signal(false);

  // --- NAVEGACIÓN ---
  onBack() {
    this.router.navigate(['/']);
  }

  // --- ACCIÓN PRINCIPAL: GUARDAR PRESUPUESTO ---
  onSaveBudget() {
    // 1. Validar: Si alto o ancho son 0, mostramos error visual y paramos
    if (this.calc.alto() === 0 || this.calc.ancho() === 0) {
      this.mostrarErrores.set(true);
      return;
    }

    // 2. Si todo OK, limpiamos errores
    this.mostrarErrores.set(false);

    // 3. Preparar datos para el Backend
    // Creamos el objeto que enviaremos a la base de datos
    const presupuestoFinal = {
      dimensiones: `${this.calc.ancho()}x${this.calc.alto()} ${this.calc.unidad()}`,
      material: this.calc.material(),
      corte: this.calc.corte(),
      adhesivo: this.calc.adhesivo(),
      instalacion: this.calc.instalacion(),
      precioTotal: this.calc.precioTotal()
    };

    console.log('Enviando al backend...', presupuestoFinal);

    // 4. LLAMADA AL SERVIDOR
    this.budgetService.createBudget(presupuestoFinal).subscribe({
      next: (response) => {
        console.log('✅ Respuesta servidor:', response);
        alert(`¡Presupuesto guardado con éxito!`);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Hubo un error al conectar con el servidor. Revisa si el Backend está encendido.');
      }
    });
  }

  // --- HELPERS PARA INPUTS Y LÓGICA ---

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
