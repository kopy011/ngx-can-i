import { Action, Entity, Role } from '../permission.registry';

export interface PermissionConfigItem {
  action: Action;
  entity: Entity;
}

export type PermissionConfig = Partial<Record<Role, PermissionConfigItem[]>>;
