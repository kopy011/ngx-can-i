import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { CANI_OPTIONS, CanIOptions } from './token';
import { CanIService } from './services/can-i-service';

export function provideCanI(options: CanIOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    CanIService,
    { provide: CANI_OPTIONS, useValue: options },
    provideAppInitializer(() => {
      const svc = inject(CanIService);
      const opts = inject(CANI_OPTIONS);
      (opts.initial ?? []).forEach((k) => svc.grant(k));
    }),
  ]);
}
