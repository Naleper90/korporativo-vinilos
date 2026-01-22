import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Obtener todos (público/admin)
  getAllBudgets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/presupuestos`);
  }

  // Obtener uno por ID
  getBudgetById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/presupuestos/${id}`);
  }

  // Crear presupuesto
  createBudget(budget: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/presupuestos`, budget);
  }


  // Obtener presupuestos de un usuario específico
  getBudgetsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/presupuestos/user/${userId}`);
  }

  // Borrar presupuesto
  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/presupuestos/${id}`);
  }
}
