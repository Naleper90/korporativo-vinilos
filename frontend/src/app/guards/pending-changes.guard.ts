import { CanDeactivateFn } from '@angular/router';
import { RegisterForm } from '../components/shared/register-form/register-form';

export const pendingChangesGuard: CanDeactivateFn<RegisterForm> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return confirm(
    'Hay cambios sin guardar en el formulario de registro. ¿Seguro que quieres salir de la página?'
  );
};
