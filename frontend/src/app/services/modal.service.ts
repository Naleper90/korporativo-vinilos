/**
 * Servicio para gestionar la apertura/cierre de modales desde cualquier componente.
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find(x => x.id === id);
    if (modal) {
      modal.open();
    } else {
      console.warn(`Modal '${id}' no encontrado.`);
    }
  }

  close(id: string) {
    const modal = this.modals.find(x => x.id === id);
    if (modal) {
      modal.close();
    }
  }
}
