import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { App } from './app';
import { ThemeService } from './services/theme.service';
import { NotificationService } from './services/notification';

describe('App', () => {
  beforeEach(async () => {
    const themeServiceMock = {
      theme$: of('light'),
      setTheme: jasmine.createSpy('setTheme')
    };

    const notificationServiceMock = {
      notifications$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
