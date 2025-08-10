import { InjectionToken } from '@angular/core';
import { PermissionKey } from './permission.registry';

export interface CanIOptions {
  /** Permissions granted at bootstrap */
  initial?: ReadonlyArray<PermissionKey>;
}

export const CANI_OPTIONS = new InjectionToken<CanIOptions>('CANI_OPTIONS', {
  factory: () => ({ initial: [] }),
});
