import { Injectable } from '@angular/core';
import { Action, Entity, PermissionKey, toKey } from '../permission.registry';

@Injectable()
export class CanIService {
  public readonly grantedPermissions = new Set<PermissionKey>();
  private readonly grantedRoutePermissions = new Set<string>();

  //routes
  grantRoute(path: string) {
    this.grantedRoutePermissions.add(path);
    return this;
  }
  revokeRoute(path: string) {
    this.grantedRoutePermissions.delete(path);
    return this;
  }
  hasRoute(path: string) {
    return this.grantedRoutePermissions.has(path);
  }
  revokeAllRoutes() {
    this.grantedRoutePermissions.clear();
    return this;
  }

  //grant
  grant(key: PermissionKey): this;
  grant<A extends Action, E extends Entity>(action: A, entity: E): this;
  grant(a: PermissionKey | Action, b?: Entity): this {
    const key = b !== undefined ? toKey(a, b) : a;
    this.grantedPermissions.add(key);
    return this;
  }

  //revoke
  revoke(key: PermissionKey): this;
  revoke<A extends Action, E extends Entity>(action: A, entity: E): this;
  revoke(a: PermissionKey | Action, b?: Entity): this {
    const key = b !== undefined ? toKey(a, b) : a;
    this.grantedPermissions.delete(key);
    return this;
  }

  //has
  has(key: PermissionKey): boolean;
  has<A extends Action, E extends Entity>(action: A, entity: E): boolean;
  has(a: PermissionKey | Action, b?: Entity): boolean {
    const key = b !== undefined ? toKey(a, b) : a;
    return this.grantedPermissions.has(key);
  }

  revokeAll() {
    this.grantedPermissions.clear();
    return this;
  }
}
