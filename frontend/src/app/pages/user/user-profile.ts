import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    <section>
      <h2>Perfil</h2>
      <p>Aquí irán los datos básicos del usuario.</p>
    </section>
  `,
})
export class UserProfile {}
