import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/presupuestos';

  createBudget(data: any): Observable<any> {
    const payload = {
      titulo: 'Presupuesto Vinilo ' + new Date().toLocaleDateString(),
      precio: data.precioTotal,
      fecha: new Date().toISOString().split('T')[0],
      clienteId: 1, // ID temporal (hardcodeado) hasta que tengamos login real
      descripcion: `
        Detalles técnicos:
        - Dimensiones: ${data.dimensiones}
        - Material: ${data.material}
        - Corte: ${data.corte}
        - Adhesivo: ${data.adhesivo}
        - Instalación: ${data.instalacion ? 'SÍ' : 'NO'}
      `
    };

    return this.http.post(this.apiUrl, payload);
  }
}
