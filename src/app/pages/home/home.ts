import { Component } from '@angular/core';
import { Main } from '../../components/layout/main/main';
import { Button } from '../../components/shared/button/button';
import { TabsComponent } from '../../components/shared/tabs/tabs';
import { RegisterForm } from '../../components/shared/register-form/register-form';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Main, Button, TabsComponent, RegisterForm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  demoTabs = [
  {
    id: 'redes',
    label: 'Redes sociales',
    content: 'Síguenos en Instagram, Behance y Dribbble para ver proyectos reales.'
  },
  {
    id: 'soporte',
    label: 'Soporte',
    content: 'Te respondemos en menos de 24h por email o formulario de contacto.'
  },
  {
    id: 'equipo',
    label: 'Nuestro estudio',
    content: 'Equipo especializado en vinilos para retail, oficinas y eventos.'
  }
];
}
