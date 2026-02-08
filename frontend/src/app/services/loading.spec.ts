import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show is called', (done) => {
    service.loading$.subscribe(loading => {
      expect(loading).toBe(true);
      done();
    });
    
    service.show();
  });

  it('should emit false when hide is called', (done) => {
    service.loading$.subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
    
    service.hide();
  });

  it('should toggle loading state correctly', (done) => {
    let emissionCount = 0;
    const emissions: boolean[] = [];

    service.loading$.subscribe(loading => {
      emissions.push(loading);
      emissionCount++;
      
      if (emissionCount === 2) {
        expect(emissions[0]).toBe(true);
        expect(emissions[1]).toBe(false);
        done();
      }
    });

    service.show();
    service.hide();
  });
});
