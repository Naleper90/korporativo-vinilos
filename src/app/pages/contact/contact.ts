import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Main } from '../../components/layout/main/main';
import { ContactForm } from '../../components/shared/contact-form/contact-form';
import { ModalComponent } from '../../modal/modal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Main, ContactForm, ModalComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {

@ViewChild('modal', { static: false }) modal!: ModalComponent;

  constructor(private router: Router) {}

  onBack(): void {
    this.router.navigate(['/']);
  }

  onFormSubmit(): void {
  console.log('Formulario enviado');
  this.modal?.openModal();
}

}
