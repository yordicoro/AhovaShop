import { Observable } from 'rxjs';
import { OrderAggregate } from 'clothing-core';

export abstract class OrderRepository {
    abstract createOrder(order: OrderAggregate): Observable<OrderAggregate>;
    abstract getOrdersByCustomer(customerId: string): Observable<OrderAggregate[]>;
}
