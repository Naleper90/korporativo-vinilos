import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { CalculatorService } from '../../services/calculator.service';
import { BudgetService } from '../../services/budgets.service';
import { LoadingService } from '../../services/loading';
import { PdfService } from '../../services/pdf.service';
import { AuthService } from '../../services/auth.service';

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
  private loadingService = inject(LoadingService);
  private pdfService = inject(PdfService);
  private authService = inject(AuthService);
  public calc = inject(CalculatorService);

  // Estado visual
  mostrarErrores = signal(false);

  // --- NAVEGACIÓN ---
  onBack() {
    this.router.navigate(['/']);
  }

  // --- ACCIÓN PRINCIPAL: GUARDAR PRESUPUESTO ---
  onSaveBudget() {
    // 1. Validar dimensiones
    if (this.calc.alto() === 0 || this.calc.ancho() === 0) {
      this.mostrarErrores.set(true);
      return;
    }
    this.mostrarErrores.set(false);

    // 2. Validar USUARIO (Seguridad)
    const currentUser = this.authService.currentUser();

    if (!currentUser || !currentUser.id) {
        alert('⚠️ Para guardar un presupuesto necesitas iniciar sesión.');
        this.router.navigate(['/']);
        return;
    }

    const esMetros = this.calc.unidad() === 'm';
    const anchoNormalizado = esMetros ? this.calc.ancho() * 100 : this.calc.ancho();
    const altoNormalizado = esMetros ? this.calc.alto() * 100 : this.calc.alto();

    const presupuestoParaBackend = {
      anchoCm: anchoNormalizado,
      altoCm: altoNormalizado,
      tipoVinilo: this.calc.material(),
      tipoCorte: this.calc.corte(),
      tipoAdhesivo: this.calc.adhesivo(),
      incluirInstalacion: this.calc.instalacion(),
      incluirIva: this.calc.incluirIvaManual(),
      pais: this.calc.pais(),
      precioFinal: this.calc.precioTotal(),
      userId: currentUser.id,
    };

    console.log('📡 Enviando al backend...', presupuestoParaBackend);

    // 4. ACTIVAR SPINNER GLOBAL
    this.loadingService.show();

    // 5. LLAMADA AL SERVIDOR
    this.budgetService.createBudget(presupuestoParaBackend).subscribe({
      next: (response: any) => {
        this.loadingService.hide();

        // --- GENERAR Y DESCARGAR PDF ---
        this.pdfService.generateBudgetPDF({
            id: response.id, // ID que devuelve el backend
            ...presupuestoParaBackend, // Datos que acabamos de enviar
            createdAt: new Date().toISOString(), // Fecha actual
            clientName: currentUser.username, // Añadimos nombre al PDF
            clientEmail: currentUser.email
        });

        alert(`¡Presupuesto guardado y descargado con éxito!`);
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('❌ Error:', error);
        alert('Hubo un error al guardar el presupuesto. Inténtalo de nuevo más tarde.');
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
