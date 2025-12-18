import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Main } from '../../components/layout/main/main';
import { FormInput } from '../../components/shared/form-input/form-input';
import { Button } from '../../components/shared/button/button';
import { BudgetStateService } from '../../services/budget-state';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [Main, FormInput, Button, AsyncPipe, NgIf],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
})
export class Calculator {
  total = 0;
  budget$;

  constructor(
    private router: Router,
    private budgetState: BudgetStateService
  ) {
    this.budget$ = this.budgetState.budget$;
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onCalculate(): void {
    this.total = 120;
    this.budgetState.setBudget(this.total);
  }
}
