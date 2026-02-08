import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { StyleGuide } from './style-guide';
import { AuthService } from '../../services/auth.service';

describe('StyleGuide', () => {
  let component: StyleGuide;
  let fixture: ComponentFixture<StyleGuide>;

  beforeEach(async () => {
    const authServiceMock = {
      currentUser: signal(null),
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(false),
      login: jasmine.createSpy('login'),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [StyleGuide],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleGuide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
