import { Component } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  template: `
    <section>
      <h2>Pedidos</h2>
      <p>Aquí se mostrarán los pedidos de vinilos del usuario.</p>
    </section>
  `,
})
export class UserOrders {}
