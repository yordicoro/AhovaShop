import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';

@Injectable({
    providedIn: 'root'
})
export class GetOrdersByCustomerUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    execute(customerId: string): Observable<OrderAggregate[]> {
        return this.orderRepository.getOrdersByCustomer(customerId);
    }
}
