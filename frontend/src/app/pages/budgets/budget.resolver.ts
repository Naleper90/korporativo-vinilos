import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { BudgetService } from '../../services/budgets.service';

export const budgetResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const budgetService = inject(BudgetService);
  const router = inject(Router);

  const idParam = route.paramMap.get('id');
  const id = idParam ? Number(idParam) : NaN;

  return budgetService.getBudgetById(id).pipe(
    map(budget => {
      if (!budget) {
        router.navigate(['/presupuestos'], {
          queryParams: { error: 'not-found' },
        });
        return null;
      }
      return budget;
    }),
    catchError(err => {
      router.navigate(['/presupuestos'], {
        queryParams: { error: 'server-error' },
      });
      return of(null);
    })
  );
};
