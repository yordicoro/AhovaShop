import { Observable } from 'rxjs';
import { OrderAggregate } from 'clothing-core';

export abstract class OrderRepository {
    abstract getAll(): Observable<OrderAggregate[]>;
    abstract update(order: OrderAggregate): Observable<OrderAggregate>;
}
