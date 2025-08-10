import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CanIService } from '../services/can-i-service';

export const canIVisitGuard: CanActivateFn = (route) => {
  const canIService = inject(CanIService);
  const path = route.routeConfig?.path ?? '';

  if (!canIService.hasRoute(path)) return false;

  return true;
};
