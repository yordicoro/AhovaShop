import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { orderFeature, OrderEffects, authFeature, AuthEffects, productFeature, ProductEffects, ORDER_REPOSITORY_PROVIDER, PRODUCT_REPOSITORY_PROVIDER, AUTH_REPOSITORY_PROVIDER } from 'clothing-core';

import { ROUTES } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(ROUTES),

    provideHttpClient(
      // withInterceptors([loggingInterceptor])
    ),
    provideStore(),
    provideState(orderFeature),
    provideState(authFeature),
    provideState(productFeature),
    provideEffects([OrderEffects, AuthEffects, ProductEffects]),
    ORDER_REPOSITORY_PROVIDER,
    PRODUCT_REPOSITORY_PROVIDER,
    AUTH_REPOSITORY_PROVIDER,
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};
