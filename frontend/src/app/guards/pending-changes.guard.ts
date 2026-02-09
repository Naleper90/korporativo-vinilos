/**
 * Guard para advertir al usuario si intenta salir con cambios sin guardar.
 */
import { CanDeactivateFn } from '@angular/router';
import { RegisterFormComponent } from '../components/shared/register-form/register-form';

export const pendingChangesGuard: CanDeactivateFn<RegisterFormComponent> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return confirm(
    'Hay cambios sin guardar en el formulario de registro. ¿Seguro que quieres salir de la página?'
  );
};
