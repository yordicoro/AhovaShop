import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAggregate } from 'clothing-core';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class GetAllOrdersUseCase {
    private repository = inject(OrderRepository);

    execute(): Observable<OrderAggregate[]> {
        return this.repository.getAll();
    }
}
