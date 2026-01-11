import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAggregate, OrderRepository as CoreOrderRepository } from 'clothing-core';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class OrderRepositoryImpl implements OrderRepository {
    private coreRepo = inject(CoreOrderRepository);

    createOrder(order: OrderAggregate): Observable<OrderAggregate> {
        return this.coreRepo.createOrder(order);
    }

    getOrdersByCustomer(customerId: string): Observable<OrderAggregate[]> {
        return this.coreRepo.getOrdersByCustomer(customerId);
    }
}
