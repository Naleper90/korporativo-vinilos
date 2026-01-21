import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class ModalComponent {
  @ViewChild('modal') modal?: ElementRef;
  isModalOpen = false;

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

@HostListener('document:keydown.escape') onEsc() { this.closeModal(); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isModalOpen && !this.modal?.nativeElement.contains(event.target as Node)) {
      this.closeModal();
    }
  }
}
