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
import {
  orderFeature,
  OrderEffects,
  authFeature,
  AuthEffects,
  productFeature,
  ProductEffects,
  ProductRepository as CoreProductRepository,
  OrderRepository as CoreOrderRepository,
  AuthRepository as CoreAuthRepository,
  ORDER_REPOSITORY_PROVIDER,
  PRODUCT_REPOSITORY_PROVIDER,
  AUTH_REPOSITORY_PROVIDER
} from 'clothing-core';

import { ROUTES } from './app.routes';
import { ProductRepository } from './domains/products/domain/repositories/product.repository';
import { ProductRepositoryImpl } from './domains/products/infrastructure/repositories/product.repository.impl';
import { AuthRepository } from './domains/auth/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './domains/auth/infrastructure/repositories/auth.repository.impl';
import { OrderRepository } from './domains/orders/domain/repositories/order.repository';
import { OrderRepositoryImpl } from './domains/orders/infrastructure/repositories/order.repository.impl';

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
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    ORDER_REPOSITORY_PROVIDER,
    PRODUCT_REPOSITORY_PROVIDER,
    AUTH_REPOSITORY_PROVIDER,
    { provide: ProductRepository, useClass: ProductRepositoryImpl },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: OrderRepository, useClass: OrderRepositoryImpl },
  ]
};
