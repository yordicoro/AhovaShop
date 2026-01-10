import { OrderEntity } from '../../domain/entities/order.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { OrderAggregate } from '../aggregates/order.aggregate';
import { OrderItemValueObject } from '../../domain/value-objects/order-item.value-object';

export class OrderFactory {
    /**
     * Factory Method (Point 10)
     * Centralizes the creation of the Order Aggregate from cart items.
     */
    static createFromCart(items: CartItem[], customerId: string = 'guest'): OrderAggregate {
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderId = Math.random().toString(36).substring(7);

        // Status is passed as a literal string that matches the OrderStatus union type
        const orderEntity = new OrderEntity(
            orderId,
            customerId,
            totalAmount,
            'PENDING',
            new Date()
        );

        const orderItems = items.map(i => new OrderItemValueObject(
            i.productId,
            i.productName,
            i.quantity,
            i.price
        ));

        return new OrderAggregate(orderEntity, orderItems);
    }
}
