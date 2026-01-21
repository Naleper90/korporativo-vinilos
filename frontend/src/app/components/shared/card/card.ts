import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() showAction = false;
  @Input() actionLabel = 'Ver más';
}
