import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { NotificationService } from './services/notification';
import { ToastComponent } from './components/shared/toast/toast';
import { SpinnerComponent } from './components/shared/spinner/spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, Footer, ToastComponent, SpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit, OnDestroy {
  notifications: any[] = [];

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.notifService.notifications$.subscribe(notif => {
      this.notifications.push(notif);
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n !== notif);
      }, notif.duration || 4000);
    });
  }

  ngOnDestroy() {}
}
