/**
 * Componente modal reutilizable con id único.
 * Se registra en ModalService y se añade al body del documento.
 */
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      console.error('El modal debe tener un id');
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      document.body.appendChild(this.el.nativeElement);
    }

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    if (this.id) {
      this.modalService.remove(this.id);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.remove();
    }
  }

  open(): void {
    this.isOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('modal-open');
    }
  }

  close(): void {
    this.isOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
    }
  }
}
