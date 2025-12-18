import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
  content: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss']
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  activeTab = 'redes';
}
