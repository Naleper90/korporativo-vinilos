import { Injectable, signal, computed } from '@angular/core';
import type { Budget } from './budgets-http.service';

interface BudgetState {
  budgets: Budget[];
  selectedBudget: Budget | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class BudgetStateService {
  private readonly _state = signal<BudgetState>({
    budgets: [],
    selectedBudget: null,
    loading: false,
    error: null,
  });

  readonly state = this._state.asReadonly();

  budgets = computed(() => this._state().budgets);
  selectedBudget = computed(() => this._state().selectedBudget);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  // --- CONTADORES Y ESTADÍSTICAS ---
  totalCount = computed(() => this._state().budgets.length);
  totalAmount = computed(() =>
    this._state().budgets.reduce((sum, b) => sum + b.precio, 0)
  );
  averagePrice = computed(() => {
    const count = this.totalCount();
    return count > 0 ? this.totalAmount() / count : 0;
  });

  // --- SETTERS ---
  setBudgets(budgets: Budget[]) {
    this._state.update(state => ({
      ...state,
      budgets,
    }));
  }

  setSelectedBudget(budget: Budget | null) {
    this._state.update(state => ({
      ...state,
      selectedBudget: budget,
    }));
  }

  setLoading(loading: boolean) {
    this._state.update(state => ({
      ...state,
      loading,
    }));
  }

  setError(error: string | null) {
    this._state.update(state => ({
      ...state,
      error,
    }));
  }

  // --- MÉTODOS CRUD ---
  add(budget: Budget) {
    this._state.update(state => ({
      ...state,
      budgets: [...state.budgets, budget],
    }));
  }

  update(budget: Budget) {
    this._state.update(state => ({
      ...state,
      budgets: state.budgets.map(b => (b.id === budget.id ? budget : b)),
      selectedBudget:
        state.selectedBudget?.id === budget.id ? budget : state.selectedBudget,
    }));
  }

  remove(id: number) {
    this._state.update(state => ({
      ...state,
      budgets: state.budgets.filter(b => b.id !== id),
      selectedBudget: state.selectedBudget?.id === id ? null : state.selectedBudget,
    }));
  }

  clear() {
    this._state.set({
      budgets: [],
      selectedBudget: null,
      loading: false,
      error: null,
    });
  }
}
