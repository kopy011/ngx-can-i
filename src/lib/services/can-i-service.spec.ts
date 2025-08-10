import { TestBed } from '@angular/core/testing';

import { CanIService } from './can-i-service';
import { PermissionKey } from 'ngx-can-i';
import { Action, Entity, Role } from '../permission.registry';
import { PermissionConfig, PermissionConfigItem } from '../model/permission-config.model';

describe('CanIService', () => {
  let canIService: CanIService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CanIService] });
    canIService = TestBed.inject(CanIService);
  });

  it('should be created', () => {
    expect(canIService).toBeTruthy();
  });

  describe('grant', () => {
    beforeEach(() => {
      canIService.revokeAll();
      canIService.revokeAllRoutes();
    });

    const permissionKey = 'edit:User' as PermissionKey;
    const action = 'edit' as Action;
    const entity = 'User' as Entity;

    it('should grant permission for PermissionKey overload', () => {
      canIService.grant(permissionKey);
      expect(canIService.has(permissionKey)).toBeTrue();
    });

    it('should grant permission for action and entity overload', () => {
      canIService.grant(action, entity);
      expect(canIService.has(permissionKey)).toBeTrue();
    });

    it('should not crash after granting an existent permission', () => {
      expect(canIService.grant(permissionKey)).toBeInstanceOf(CanIService);
      expect(canIService.grant(permissionKey)).toBeInstanceOf(CanIService);
      expect(canIService.has(permissionKey)).toBeTrue();
    });
  });

  describe('revoke', () => {
    beforeEach(() => {
      canIService.revokeAll();
      canIService.revokeAllRoutes();
    });

    const permissionKey = 'edit:User' as PermissionKey;
    const action = 'edit' as Action;
    const entity = 'User' as Entity;

    it('should have permission before revoke with PermissionKey overload and not after', () => {
      canIService.grant(permissionKey);
      expect(canIService.has(permissionKey)).toBeTrue();
      canIService.revoke(permissionKey);
      expect(canIService.has(permissionKey)).toBeFalse();
    });

    it('should have permission before revoke with PermissionKey overload and not after', () => {
      canIService.grant(permissionKey);
      expect(canIService.has(permissionKey)).toBeTrue();
      canIService.revoke(action, entity);
      expect(canIService.has(permissionKey)).toBeFalse();
    });

    it('should not crash after revoking a non existent permission', () => {
      expect(canIService.revoke(permissionKey)).toBeInstanceOf(CanIService);
    });
  });

  describe('has', () => {
    const permissionKey = 'edit:User' as PermissionKey;
    const action = 'edit' as Action;
    const entity = 'User' as Entity;

    const nonExistentPermissionKey = 'delete:Dog' as PermissionKey;
    const nonExistentAction = 'delete' as Action;
    const nonExistentEntity = 'Dog' as Entity;
    beforeEach(() => {
      canIService.grant(permissionKey);
    });

    it('should return true for an existent permission with PermissionKey overload', () => {
      expect(canIService.has(permissionKey)).toBeTrue();
    });

    it('should return false for a non existent permission with PermissionKey overload', () => {
      expect(canIService.has(nonExistentPermissionKey)).toBeFalse();
    });

    it('should return true for an existent permission with action and entity overload', () => {
      expect(canIService.has(action, entity)).toBeTrue();
    });

    it('should return true for a non existent permission with action and entity overload', () => {
      expect(canIService.has(nonExistentAction, nonExistentEntity)).toBeFalse();
    });
  });

  describe('chain', () => {
    const permissionKey = 'edit:User' as PermissionKey;
    const action = 'edit' as Action;
    const entity = 'User' as Entity;

    it('should chain different operations properly', () => {
      canIService.grant(permissionKey).revoke(action, entity);
      expect(canIService.has(permissionKey)).toBeFalse();
      expect(canIService.grant(action, entity).revokeAll().grant(permissionKey).has(action, entity)).toBeTrue();
    });
  });

  describe('grantFromConfig', () => {
    beforeEach(() => canIService.revokeAll());

    const permissions: PermissionConfigItem[] = [
      {
        action: 'edit' as Action,
        entity: 'User' as Entity,
      },
      {
        action: 'create' as Action,
        entity: 'BlogPost' as Entity,
      },
    ];

    const permissionConfig: PermissionConfig = {
      ['admin' as Role]: [
        {
          action: 'create' as Action,
          entity: 'BlogPost' as Entity,
        },
      ],
      ['user' as Role]: [
        {
          action: 'edit' as Action,
          entity: 'User' as Entity,
        },
      ],
    };

    it('should grant multiple permissions from a PermissionConfigItems', () => {
      canIService.grantFromConfig(permissions);
      expect(canIService.has('edit:User' as PermissionKey)).toBeTrue();
      expect(canIService.has('create:BlogPost' as PermissionKey)).toBeTrue();
    });

    it('should add permissions for only the given roles', () => {
      canIService.grantFromConfigByRoles(['admin'] as Role[], permissionConfig);
      expect(canIService.has('create:BlogPost' as PermissionKey)).toBeTrue();
      expect(canIService.has('edit:User' as PermissionKey)).toBeFalse();
    });
  });

  describe('route permissions', () => {
    const route = '/home';

    beforeEach(() => {
      canIService.revokeAllRoutes();
    });

    it('should grant permission for a path', () => {
      expect(canIService.hasRoute(route)).toBeFalse();
      canIService.grantRoute(route);
      expect(canIService.hasRoute(route)).toBeTrue();
    });

    it('should revoke permission for a path', () => {
      canIService.grantRoute(route);
      expect(canIService.hasRoute(route)).toBeTrue();
      canIService.revokeRoute(route);
      expect(canIService.hasRoute(route)).toBeFalse();
    });
  });
});
