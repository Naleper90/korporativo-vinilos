import { Component } from '@angular/core';
import { Button } from '../../components/shared/button/button';
import { Alert } from '../../components/shared/alert/alert';
import { FormInput } from '../../components/shared/form-input/form-input';
import { ContactForm } from '../../components/shared/contact-form/contact-form';
import { Card } from '../../components/shared/card/card';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect } from '../../components/shared/form-select/form-select';

@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [
    Button,
    Alert,
    FormInput,
    ContactForm,
    Card,
    FormTextarea,
    FormSelect
  ],
  templateUrl: './style-guide.html',
  styleUrls: ['./style-guide.scss']
})
export class StyleGuide {
  countryOptions = [
    {value: '', label: 'Selecciona una opción'},
    {value: 'es', label: 'España'},
    {value: 'mx', label: 'México'},
    {value: 'ar', label: 'Argentina'},
    {value: 'cl', label: 'Chile'}
  ];
}
