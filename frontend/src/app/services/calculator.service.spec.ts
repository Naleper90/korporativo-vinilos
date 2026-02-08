import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.alto()).toBe(0);
    expect(service.ancho()).toBe(0);
    expect(service.unidad()).toBe('cm');
    expect(service.material()).toBe('monomerico');
    expect(service.corte()).toBe('recto');
    expect(service.adhesivo()).toBe('normal');
    expect(service.instalacion()).toBe(false);
    expect(service.pais()).toBe('ES');
    expect(service.incluirIvaManual()).toBe(true);
  });

  it('should calculate precio base correctly for cm', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.unidad.set('cm');
    
    const expectedBase = 100 * 100 * 0.05; // 500€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should calculate precio base correctly for meters', () => {
    service.alto.set(1);
    service.ancho.set(1);
    service.unidad.set('m');
    
    const expectedBase = 100 * 100 * 0.05; // 500€ (1m = 100cm)
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should return 0 when dimensions are 0', () => {
    service.alto.set(0);
    service.ancho.set(0);
    expect(service.precioBase()).toBe(0);
  });

  it('should apply polimerico material factor (1.5x)', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.material.set('polimerico');
    
    const expectedBase = 100 * 100 * 0.05 * 1.5; // 750€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should apply transparente material factor (1.2x)', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.material.set('transparente');
    
    const expectedBase = 100 * 100 * 0.05 * 1.2; // 600€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should apply contorno corte factor (+10%)', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.corte.set('contorno');
    
    const expectedBase = 100 * 100 * 0.05 * 1.10; // 550€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should apply extra adhesivo factor (+20%)', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.adhesivo.set('extra');
    
    const expectedBase = 100 * 100 * 0.05 * 1.20; // 600€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should add instalacion cost (50€)', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.instalacion.set(true);
    
    const expectedBase = 100 * 100 * 0.05 + 50; // 550€
    expect(service.precioBase()).toBe(expectedBase);
  });

  it('should calculate IVA for ES (21%)', () => {
    service.pais.set('ES');
    expect(service.porcentajeIva()).toBe(0.21);
  });

  it('should calculate IVA for PT (23%)', () => {
    service.pais.set('PT');
    expect(service.porcentajeIva()).toBe(0.23);
  });

  it('should calculate IVA for CANARIAS (0%)', () => {
    service.pais.set('CANARIAS');
    expect(service.porcentajeIva()).toBe(0.00);
  });

  it('should calculate precioTotal with IVA', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.pais.set('ES');
    service.incluirIvaManual.set(true);
    
    const base = 500;
    const expectedTotal = Number((base * 1.21).toFixed(2)); // 605€
    expect(service.precioTotal()).toBe(expectedTotal);
  });

  it('should calculate precioTotal without IVA when manual is false', () => {
    service.alto.set(100);
    service.ancho.set(100);
    service.incluirIvaManual.set(false);
    
    const expectedTotal = 500;
    expect(service.precioTotal()).toBe(expectedTotal);
  });

  it('should disable IVA automatically for CANARIAS', (done) => {
    service.pais.set('CANARIAS');
    
    setTimeout(() => {
      expect(service.incluirIvaManual()).toBe(false);
      done();
    }, 100);
  });

  it('should enable IVA automatically when changing from CANARIAS to ES', (done) => {
    service.pais.set('CANARIAS');
    
    setTimeout(() => {
      expect(service.incluirIvaManual()).toBe(false);
      
      service.pais.set('ES');
      
      setTimeout(() => {
        expect(service.incluirIvaManual()).toBe(true);
        done();
      }, 100);
    }, 100);
  });
});
