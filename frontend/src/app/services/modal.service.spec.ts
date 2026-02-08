import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a modal', () => {
    const mockModal = { id: 'test-modal', open: jasmine.createSpy('open'), close: jasmine.createSpy('close') };
    service.add(mockModal);
    
    // Verificamos que se pueda abrir
    service.open('test-modal');
    expect(mockModal.open).toHaveBeenCalled();
  });

  it('should remove a modal', () => {
    const mockModal = { id: 'test-modal', open: jasmine.createSpy('open'), close: jasmine.createSpy('close') };
    service.add(mockModal);
    service.remove('test-modal');
    
    // Intentar abrir un modal eliminado no debería hacer nada
    spyOn(console, 'warn');
    service.open('test-modal');
    expect(mockModal.open).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith("Modal 'test-modal' no encontrado.");
  });

  it('should open a modal by id', () => {
    const mockModal = { id: 'test-modal', open: jasmine.createSpy('open'), close: jasmine.createSpy('close') };
    service.add(mockModal);
    
    service.open('test-modal');
    expect(mockModal.open).toHaveBeenCalled();
  });

  it('should close a modal by id', () => {
    const mockModal = { id: 'test-modal', open: jasmine.createSpy('open'), close: jasmine.createSpy('close') };
    service.add(mockModal);
    
    service.close('test-modal');
    expect(mockModal.close).toHaveBeenCalled();
  });

  it('should warn when trying to open non-existent modal', () => {
    spyOn(console, 'warn');
    service.open('non-existent');
    expect(console.warn).toHaveBeenCalledWith("Modal 'non-existent' no encontrado.");
  });

  it('should handle multiple modals', () => {
    const modal1 = { id: 'modal-1', open: jasmine.createSpy('open1'), close: jasmine.createSpy('close1') };
    const modal2 = { id: 'modal-2', open: jasmine.createSpy('open2'), close: jasmine.createSpy('close2') };
    
    service.add(modal1);
    service.add(modal2);
    
    service.open('modal-1');
    expect(modal1.open).toHaveBeenCalled();
    expect(modal2.open).not.toHaveBeenCalled();
    
    service.open('modal-2');
    expect(modal2.open).toHaveBeenCalled();
  });
});
