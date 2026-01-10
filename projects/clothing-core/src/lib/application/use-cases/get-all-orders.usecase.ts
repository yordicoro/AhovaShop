import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class GetAllOrdersUseCase {
    constructor(private orderRepository: OrderRepository) { }

    execute(): Observable<OrderAggregate[]> {
        return this.orderRepository.getAllOrders();
    }
}
