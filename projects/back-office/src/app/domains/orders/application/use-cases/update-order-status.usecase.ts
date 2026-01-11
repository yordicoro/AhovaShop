import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAggregate, OrderStatus, OrderEntity } from 'clothing-core';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class UpdateOrderStatusUseCase {
    private repository = inject(OrderRepository);

    execute(orderAggregate: OrderAggregate, newStatus: string): Observable<OrderAggregate> {
        const updatedOrderEntity = new OrderEntity(
            orderAggregate.order.id,
            orderAggregate.order.customerId,
            orderAggregate.order.totalAmount,
            newStatus as OrderStatus,
            orderAggregate.order.createdAt
        );

        const updatedAggregate = new OrderAggregate(
            updatedOrderEntity,
            orderAggregate.items
        );

        return this.repository.update(updatedAggregate);
    }
}
