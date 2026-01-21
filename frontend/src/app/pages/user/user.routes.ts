import { Routes } from '@angular/router';
import { UserLayout } from './user-layout';
import { UserProfile } from './user-profile';
import { UserOrders } from './user-orders';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: 'perfil', component: UserProfile, data: { breadcrumb: 'Perfil' } },
      { path: 'pedidos', component: UserOrders, data: { breadcrumb: 'Pedidos' } },
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    ],
  },
];
