import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal';
import { ModalService } from '../services/modal.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    const modalServiceMock = {
      add: jasmine.createSpy('add'),
      remove: jasmine.createSpy('remove')
    };

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.id = 'test-modal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
