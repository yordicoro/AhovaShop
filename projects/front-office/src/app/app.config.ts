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
  AUTH_REPOSITORY_PROVIDER,
  productFeature,
  ProductEffects,
  orderFeature,
  OrderEffects,
  authFeature,
  AuthEffects,
  cartFeature,
  ConfigService,
  GlobalErrorInterceptor,
  ProductRepository as CoreProductRepository,
  OrderRepository as CoreOrderRepository,
  AuthRepository as CoreAuthRepository
} from 'clothing-core';

import { routes } from './app.routes';
import { ProductRepository } from './domains/shop/domain/repositories/product.repository';
import { ProductRepositoryImpl } from './domains/shop/infrastructure/repositories/product.repository.impl';
import { AuthRepository } from './domains/auth/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './domains/auth/infrastructure/repositories/auth.repository.impl';
import { OrderRepository } from './domains/cart/domain/repositories/order.repository';
import { OrderRepositoryImpl } from './domains/cart/infrastructure/repositories/order.repository.impl';

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
    AUTH_REPOSITORY_PROVIDER,

    // Local repository providers
    { provide: ProductRepository, useClass: ProductRepositoryImpl },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: OrderRepository, useClass: OrderRepositoryImpl },

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
