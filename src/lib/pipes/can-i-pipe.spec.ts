import { TestBed } from '@angular/core/testing';
import { CanIPipe } from './can-i-pipe';
import { CanIService } from '../services/can-i-service';
import { Action, Entity, PermissionKey } from '../permission.registry';

describe('CanIPipe', () => {
  let canIPipe: CanIPipe;
  const canIServiceMock = jasmine.createSpyObj<CanIService>('CanIService', ['has']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanIPipe, { provide: CanIService, useValue: canIServiceMock }],
    });

    canIPipe = TestBed.inject(CanIPipe);
  });

  it('create an instance', () => {
    expect(canIPipe).toBeTruthy();
  });

  describe('transform(key: PermissionKey)', () => {
    const key = 'edit:User' as PermissionKey;
    it('returns true if CanIService has a granted permission with the parameter', () => {
      canIServiceMock.has.and.returnValue(true);
      const result = canIPipe.transform(key);

      expect(result).toBeTrue();
    });

    it('returns false if CanIService has a granted permission with the parameter', () => {
      canIServiceMock.has.and.returnValue(false);
      const result = canIPipe.transform(key);

      expect(result).toBeFalse();
    });
  });

  describe('transform(action: Action, entity: Entity)', () => {
    const action = 'edit' as Action;
    const entity = 'User' as Entity;
    it('returns true if CanIService has a granted permission with the parameter', () => {
      canIServiceMock.has.and.returnValue(true);
      const result = canIPipe.transform(action, entity);

      expect(result).toBeTrue();
    });

    it('returns false if CanIService has a granted permission with the parameter', () => {
      canIServiceMock.has.and.returnValue(false);
      const result = canIPipe.transform(action, entity);

      expect(result).toBeFalse();
    });
  });
});
