import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  PRODUCT_REPOSITORY_PROVIDER,
  ORDER_REPOSITORY_PROVIDER,
  productFeature,
  ProductEffects,
  orderFeature,
  OrderEffects,
  authFeature,
  AuthEffects,
  cartFeature,
  ConfigService,
  GlobalErrorInterceptor
} from 'clothing-core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true
    },
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return configService.loadConfig();
    }),

    PRODUCT_REPOSITORY_PROVIDER,
    ORDER_REPOSITORY_PROVIDER,

    // State Management
    provideStore(),
    provideState(productFeature),
    provideState(orderFeature),
    provideState(authFeature),
    provideState(cartFeature),
    provideEffects([ProductEffects, OrderEffects, AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ]
};
