import { Injectable, signal } from '@angular/core';
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

  budgets() {
    return this._state().budgets;
  }

  selectedBudget() {
    return this._state().selectedBudget;
  }

  loading() {
    return this._state().loading;
  }

  error() {
    return this._state().error;
  }

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
}
