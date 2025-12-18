import { Routes } from '@angular/router';
import { StyleGuide } from './pages/style-guide/style-guide';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { Calculator } from './pages/calculator/calculator';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'style-guide', component: StyleGuide },
  { path: 'contacto', component: Contact },
  { path: 'calculadora', component: Calculator },
];
