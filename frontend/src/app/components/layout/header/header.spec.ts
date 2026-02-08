import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { Header } from './header';
import { ThemeService } from '../../../services/theme.service';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let themeServiceMock: any;
  let modalServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    themeServiceMock = {
      theme$: of('light'),
      toggleTheme: jasmine.createSpy('toggleTheme')
    };

    modalServiceMock = {
      open: jasmine.createSpy('open')
    };

    authServiceMock = {
      currentUser: signal(null),
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(false),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isDark as false', () => {
    expect(component.isDark).toBe(false);
  });

  it('should initialize with isMobileMenuOpen as false', () => {
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should toggle theme when onToggleTheme is called', () => {
    component.onToggleTheme();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });

  it('should toggle mobile menu when onToggleMobileMenu is called', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    
    expect(component.isMobileMenuOpen).toBe(false);
    component.onToggleMobileMenu(event);
    expect(component.isMobileMenuOpen).toBe(true);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should close mobile menu when closeMobileMenu is called', () => {
    component.isMobileMenuOpen = true;
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should open login modal when onLogin is called', () => {
    component.onLogin();
    expect(modalServiceMock.open).toHaveBeenCalledWith('login-modal');
  });

  it('should close mobile menu when onLogin is called', () => {
    component.isMobileMenuOpen = true;
    component.onLogin();
    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('should logout and close mobile menu when onLogout is called', () => {
    component.isMobileMenuOpen = true;
    component.onLogout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(component.isMobileMenuOpen).toBe(false);
  });
});
