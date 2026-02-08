import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme from light to dark', (done) => {
    service.setTheme('light');
    service.toggleTheme();
    
    service.theme$.subscribe(theme => {
      expect(theme).toBe('dark');
      done();
    });
  });

  it('should toggle theme from dark to light', (done) => {
    service.setTheme('dark');
    service.toggleTheme();
    
    service.theme$.subscribe(theme => {
      expect(theme).toBe('light');
      done();
    });
  });

  it('should save theme to localStorage', () => {
    service.setTheme('dark');
    const saved = localStorage.getItem('theme');
    expect(saved).toBe('dark');
  });

  it('should emit theme changes', (done) => {
    let emissionCount = 0;
    
    service.theme$.subscribe(theme => {
      emissionCount++;
      if (emissionCount === 2) {
        expect(theme).toBe('dark');
        done();
      }
    });

    service.setTheme('dark');
  });
});
