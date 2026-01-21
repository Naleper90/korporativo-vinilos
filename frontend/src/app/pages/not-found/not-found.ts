import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que has escrito no existe en Korporativo.</p>
      <a routerLink="/">Volver al inicio</a>
    </section>
  `,
})
export class NotFound {}
