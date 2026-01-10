import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { OrderInfrastructureMapper } from '../mappers/order.mapper';
import { OrderDto } from '../../domain/dtos/order.dto';

@Injectable({
    providedIn: 'root'
})
export class OrderRepositoryImpl extends OrderRepository {
    private readonly API_URL = 'http://localhost:3000/orders';
    private mapper = inject(OrderInfrastructureMapper);
    private http = inject(HttpClient);

    createOrder(order: OrderAggregate): Observable<OrderAggregate> {
        const dto = this.mapper.mapToDto(order);
        return this.http.post<OrderDto>(this.API_URL, dto).pipe(
            map(response => this.mapper.mapToDomain(response))
        );
    }

    updateOrder(order: OrderAggregate): Observable<OrderAggregate> {
        const dto = this.mapper.mapToDto(order);
        return this.http.put<OrderDto>(`${this.API_URL}/${dto.id}`, dto).pipe(
            map(response => this.mapper.mapToDomain(response))
        );
    }

    getOrdersByCustomer(customerId: string): Observable<OrderAggregate[]> {
        return this.getAllOrders().pipe(
            map((orders: OrderAggregate[]) => orders.filter((o: OrderAggregate) => o.order.customerId === customerId))
        );
    }

    getAllOrders(): Observable<OrderAggregate[]> {
        return this.http.get<OrderDto[]>(this.API_URL).pipe(
            map(dtos => dtos.map(dto => this.mapper.mapToDomain(dto)))
        );
    }
}
