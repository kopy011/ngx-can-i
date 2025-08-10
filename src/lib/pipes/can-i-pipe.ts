import { inject, Pipe, PipeTransform } from '@angular/core';
import { Action, Entity, PermissionKey, toKey } from '../permission.registry';
import { CanIService } from '../services/can-i-service';

@Pipe({
  name: 'canI',
})
export class CanIPipe implements PipeTransform {
  readonly canIService = inject(CanIService);

  transform(key: PermissionKey): boolean;
  transform<A extends Action, E extends Entity>(action: A, entity: E): boolean;
  transform(a: PermissionKey | Action, b?: Entity): boolean {
    const key = b !== undefined ? toKey(a, b) : a;
    return this.canIService.has(key);
  }
}
