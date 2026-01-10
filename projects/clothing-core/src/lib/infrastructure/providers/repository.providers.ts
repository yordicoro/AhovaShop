import { Provider } from '@angular/core';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { ProductRepositoryImpl } from '../repositories/product.repository.impl';
import { OrderRepositoryImpl } from '../repositories/order.repository.impl';
import { MockAuthRepository } from '../repositories/mock-auth.repository';

export const PRODUCT_REPOSITORY_PROVIDER = {
  provide: ProductRepository,
  useClass: ProductRepositoryImpl
};

export const ORDER_REPOSITORY_PROVIDER = {
  provide: OrderRepository,
  useClass: OrderRepositoryImpl
};

export const AUTH_REPOSITORY_PROVIDER = {
  provide: AuthRepository,
  useClass: MockAuthRepository
};
