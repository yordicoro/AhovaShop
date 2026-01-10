import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';

@Injectable({
    providedIn: 'root'
})
export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepository) { }

    execute(order: OrderAggregate): Observable<OrderAggregate> {
        return this.orderRepository.createOrder(order);
    }
}
