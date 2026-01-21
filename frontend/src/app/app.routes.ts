import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { StyleGuide } from './pages/style-guide/style-guide';
import { Contact } from './pages/contact/contact';
import { Calculator } from './pages/calculator/calculator';
import { NotFound } from './pages/not-found/not-found';

import { BudgetsList } from './pages/budgets/budgets-list';
import { BudgetDetail } from './pages/budgets/budget-detail';
import { BudgetCreate } from './pages/budgets/budget-create';
import { budgetResolver } from './pages/budgets/budget.resolver';

import { authGuard } from './guards/auth.guard';
import { RegisterForm } from './components/shared/register-form/register-form';
import { pendingChangesGuard } from './guards/pending-changes.guard';

export const routes: Routes = [
  { path: '', component: Home, data: { breadcrumb: 'Inicio' } },

  { path: 'style-guide', component: StyleGuide, data: { breadcrumb: 'Style guide' } },
  { path: 'contacto', component: Contact, data: { breadcrumb: 'Contacto' } },
  { path: 'calculadora', component: Calculator, data: { breadcrumb: 'Calculadora' } },

  { path: 'presupuestos', component: BudgetsList, data: { breadcrumb: 'Presupuestos' } },

  {
    path: 'presupuestos/nuevo',
    component: BudgetCreate,
    data: { breadcrumb: 'Nuevo presupuesto' },
  },

  {
    path: 'presupuestos/:id',
    component: BudgetDetail,
    resolve: { budget: budgetResolver },
    data: { breadcrumb: 'Detalle' },
  },

  {
    path: 'usuario',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/user/user.routes').then(m => m.USER_ROUTES),
    data: { breadcrumb: 'Área de usuario' },
  },

  {
    path: 'registro',
    component: RegisterForm,
    canDeactivate: [pendingChangesGuard],
    data: { breadcrumb: 'Registro' },
  },

  { path: '**', component: NotFound, data: { breadcrumb: 'No encontrado' } },
];
