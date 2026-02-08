import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { CalculatorComponent } from './calculator';
import { CalculatorService } from '../../services/calculator.service';
import { BudgetService } from '../../services/budgets.service';
import { LoadingService } from '../../services/loading';
import { PdfService } from '../../services/pdf.service';
import { AuthService } from '../../services/auth.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let routerMock: any;
  let authServiceMock: any;
  let loadingServiceMock: any;
  let budgetServiceMock: any;
  let calcServiceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    budgetServiceMock = { 
      createBudget: jasmine.createSpy('createBudget').and.returnValue(of({ id: 1, success: true })),
      saveBudget: jasmine.createSpy('saveBudget').and.returnValue(of({}))
    };
    loadingServiceMock = { 
      show: jasmine.createSpy('show'), 
      hide: jasmine.createSpy('hide'),
      loading$: of(false)
    };
    const pdfServiceMock = { 
      generatePdf: jasmine.createSpy('generatePdf'),
      generateBudgetPDF: jasmine.createSpy('generateBudgetPDF')
    };
    authServiceMock = { 
      currentUser: signal({ id: 1, username: 'test', email: 'test@test.com' }), 
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true) 
    };
    calcServiceMock = {
      alto: signal(100),
      ancho: signal(100),
      unidad: signal('cm'),
      material: signal('vinilo'),
      corte: signal('recto'),
      adhesivo: signal('permanente'),
      instalacion: signal(false),
      incluirIvaManual: signal(true),
      pais: signal('ES'),
      precioTotal: signal(50),
      acabado: signal('brillante'),
      precio: signal(50),
      calcularPrecio: jasmine.createSpy('calcularPrecio')
    };

    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: PdfService, useValue: pdfServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CalculatorService, useValue: calcServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back on onBack()', () => {
    component.onBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show errors when dimensions are zero', () => {
    calcServiceMock.alto.set(0);
    calcServiceMock.ancho.set(0);
    
    component.onSaveBudget();
    
    expect(component.mostrarErrores()).toBe(true);
  });

  it('should not save budget when alto is zero', () => {
    calcServiceMock.alto.set(0);
    calcServiceMock.ancho.set(100);
    
    component.onSaveBudget();
    
    expect(budgetServiceMock.createBudget).not.toHaveBeenCalled();
    expect(component.mostrarErrores()).toBe(true);
  });

  it('should not save budget when ancho is zero', () => {
    calcServiceMock.alto.set(100);
    calcServiceMock.ancho.set(0);
    
    component.onSaveBudget();
    
    expect(budgetServiceMock.createBudget).not.toHaveBeenCalled();
    expect(component.mostrarErrores()).toBe(true);
  });

  it('should save budget when dimensions are valid and user is logged in', () => {
    calcServiceMock.alto.set(100);
    calcServiceMock.ancho.set(100);
    
    component.onSaveBudget();
    
    expect(component.mostrarErrores()).toBe(false);
    expect(loadingServiceMock.show).toHaveBeenCalled();
    expect(budgetServiceMock.createBudget).toHaveBeenCalled();
  });

  it('should not save budget when user is not logged in', () => {
    authServiceMock.currentUser.set(null);
    calcServiceMock.alto.set(100);
    calcServiceMock.ancho.set(100);
    
    spyOn(window, 'alert');
    component.onSaveBudget();
    
    expect(window.alert).toHaveBeenCalledWith('⚠️ Para guardar un presupuesto necesitas iniciar sesión.');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
