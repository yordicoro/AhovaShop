import { Observable } from 'rxjs';
import { OrderAggregate } from '../aggregates/order.aggregate';

export abstract class OrderRepository {
    abstract createOrder(order: OrderAggregate): Observable<OrderAggregate>;
    abstract updateOrder(order: OrderAggregate): Observable<OrderAggregate>;
    abstract getOrdersByCustomer(customerId: string): Observable<OrderAggregate[]>;
    abstract getAllOrders(): Observable<OrderAggregate[]>;
}
