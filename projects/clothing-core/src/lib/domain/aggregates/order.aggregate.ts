import { OrderEntity } from '../entities/order.entity';
import { OrderItemValueObject } from '../value-objects/order-item.value-object';

export class OrderAggregate {
    constructor(
        public readonly order: OrderEntity,
        public readonly items: OrderItemValueObject[]
    ) { }

    get itemCount(): number {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    addMethod(item: OrderItemValueObject): void {
        // Business logic to add item would go here
        this.items.push(item);
    }
}
