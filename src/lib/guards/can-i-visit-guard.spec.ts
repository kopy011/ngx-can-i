// can-i-visit.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanIService } from '../services/can-i-service';
import { canIVisitGuard } from './can-i-visit-guard';

describe('canIVisitGuard (functional CanActivate)', () => {
  let hasRouteSpy: jasmine.Spy;

  function snapshotWithPath(path?: string): ActivatedRouteSnapshot {
    return { routeConfig: path !== undefined ? ({ path } as any) : undefined } as any;
  }

  beforeEach(() => {
    hasRouteSpy = jasmine.createSpy('hasRoute');
    TestBed.configureTestingModule({
      providers: [{ provide: CanIService, useValue: { hasRoute: hasRouteSpy } }],
    });
  });

  it('returns true when CanIService.hasRoute(path) is true', () => {
    hasRouteSpy.and.returnValue(true);
    const route = snapshotWithPath('books');

    const result = TestBed.runInInjectionContext(() => canIVisitGuard(route, {} as any));

    expect(result).toBeTrue();
    expect(hasRouteSpy).toHaveBeenCalledOnceWith('books');
  });

  it('returns false when CanIService.hasRoute(path) is false', () => {
    hasRouteSpy.and.returnValue(false);
    const route = snapshotWithPath('admin');

    const result = TestBed.runInInjectionContext(() => canIVisitGuard(route, {} as any));

    expect(result).toBeFalse();
    expect(hasRouteSpy).toHaveBeenCalledOnceWith('admin');
  });

  it('passes empty string to service when routeConfig is missing', () => {
    hasRouteSpy.and.returnValue(false);
    const route = snapshotWithPath(undefined);

    const result = TestBed.runInInjectionContext(() => canIVisitGuard(route, {} as any));

    expect(result).toBeFalse();
    expect(hasRouteSpy).toHaveBeenCalledOnceWith('');
  });
});
