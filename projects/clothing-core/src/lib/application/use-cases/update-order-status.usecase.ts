import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { OrderEntity, OrderStatus } from '../../domain/entities/order.entity';

@Injectable({
    providedIn: 'root'
})
export class UpdateOrderStatusUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    execute(orderAggregate: OrderAggregate, newStatus: OrderStatus): Observable<OrderAggregate> {
        // In DDD, we usually modify the aggregate and save it
        // Here we'll create a new entity with the updated status
        if (orderAggregate.order.status === 'CONFIRMED' && newStatus === 'CONFIRMED') {
            throw new Error('El pedido ya ha sido confirmado previamente.');
        }

        const updatedOrderEntity = new OrderEntity(
            orderAggregate.order.id,
            orderAggregate.order.customerId,
            orderAggregate.order.totalAmount,
            newStatus,
            orderAggregate.order.createdAt
        );

        const updatedAggregate = new OrderAggregate(
            updatedOrderEntity,
            orderAggregate.items
        );

        return this.orderRepository.updateOrder(updatedAggregate);
        // Usually there would be an 'update' method, 
        // but in this mock repo architecture 'createOrder' might handle both or we just follow the repo interface.
        // Given the OrderRepository interface:
        // abstract createOrder(order: OrderAggregate): Observable<OrderAggregate>;
        // We'll use createOrder which likely acts as a save/upsert.
    }
}
