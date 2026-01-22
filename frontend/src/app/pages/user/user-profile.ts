import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Servicios
import { AuthService } from '../../services/auth.service';
import { BudgetService } from '../../services/budgets.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfile implements OnInit {
  private authService = inject(AuthService);
  private budgetService = inject(BudgetService);
  private pdfService = inject(PdfService);
  private router = inject(Router);

  // Datos
  user = this.authService.currentUser();
  budgets = signal<any[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    // Obtenemos el usuario actualizado
    this.user = this.authService.currentUser();

    // Si por algún motivo no hay ID, redirigimos por seguridad
    if (!this.user?.id) {
      this.router.navigate(['/']);
      return;
    }

    // Cargamos los presupuestos del usuario
    this.loadUserBudgets(this.user.id);
  }

  loadUserBudgets(userId: number) {
    this.loading.set(true);
    this.budgetService.getBudgetsByUserId(userId).subscribe({
      next: (data) => {
        // Ordenamos por fecha descendente (más nuevo arriba)
        const sorted = data.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.budgets.set(sorted);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando presupuestos', err);
        this.loading.set(false);
      }
    });
  }

  onDelete(id: number) {
    if (confirm('¿Estás seguro de querer eliminar este presupuesto?')) {
      this.budgetService.deleteBudget(id).subscribe({
        next: () => {
          // Actualizamos la lista localmente
          this.budgets.update(list => list.filter(b => b.id !== id));
        },
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  onDownload(budget: any) {
    // Intentamos recuperar la configuración técnica
    const config = (budget.viniloConfigs && budget.viniloConfigs.length > 0)
      ? budget.viniloConfigs[0]
      : {};

    this.pdfService.generateBudgetPDF({
      id: budget.id,
      anchoCm: config.anchoCm || 0,
      altoCm: config.altoCm || 0,
      tipoVinilo: config.tipoVinilo || 'No especificado',
      tipoCorte: config.tipoCorte || 'recto',
      tipoAdhesivo: config.tipoAdhesivo || 'normal',
      incluirInstalacion: config.incluirInstalacion || false,
      incluirIva: config.incluirIva || false,
      pais: config.pais || 'ES',
      precioFinal: budget.precio,
      precioBase: config.precioBase,
      createdAt: budget.fecha,
      clientName: this.user?.username,
      clientEmail: this.user?.email
    });
  }
}
