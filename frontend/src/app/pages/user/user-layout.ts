import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="user">
      <h1>Área de usuario</h1>

      <nav class="user__nav">
        <a routerLink="perfil" routerLinkActive="is-active">Perfil</a>
        <a routerLink="pedidos" routerLinkActive="is-active">Pedidos</a>
      </nav>

      <router-outlet></router-outlet>
    </section>
  `,
})
export class UserLayout {}
