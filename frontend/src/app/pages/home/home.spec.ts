import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have demoTabs array with 3 elements', () => {
    expect(component.demoTabs).toBeDefined();
    expect(component.demoTabs.length).toBe(3);
  });

  it('should have correct tab structure', () => {
    component.demoTabs.forEach(tab => {
      expect(tab.id).toBeDefined();
      expect(tab.label).toBeDefined();
      expect(tab.content).toBeDefined();
    });
  });

  it('should navigate to calculator when goToCalculator is called', () => {
    component.goToCalculator();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/calculadora']);
  });

  it('should navigate to budgets when goToBudgets is called', () => {
    component.goToBudgets();
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('should have redes tab as first tab', () => {
    expect(component.demoTabs[0].id).toBe('redes');
    expect(component.demoTabs[0].label).toBe('Redes sociales');
  });

  it('should have soporte tab as second tab', () => {
    expect(component.demoTabs[1].id).toBe('soporte');
    expect(component.demoTabs[1].label).toBe('Soporte');
  });

  it('should have equipo tab as third tab', () => {
    expect(component.demoTabs[2].id).toBe('equipo');
    expect(component.demoTabs[2].label).toBe('Nuestro estudio');
  });
});
