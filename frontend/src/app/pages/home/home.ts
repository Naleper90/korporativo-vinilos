import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Main } from '../../components/layout/main/main';
import { Button } from '../../components/shared/button/button';
import { TabsComponent } from '../../components/shared/tabs/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Main, Button, TabsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);

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
    },
  ];

  goToCalculator() {
    this.router.navigate(['/calculadora']);
  }

  goToBudgets() {
    this.router.navigate(['/presupuestos'], {
      queryParams: { from: 'home' },
    });
  }

  goToContactForm() {
    this.router.navigate(['/contacto'], {
      fragment: 'formulario-contacto',
    });
  }

}
