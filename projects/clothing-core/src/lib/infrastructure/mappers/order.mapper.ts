import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { OrderDto } from '../../domain/dtos/order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderItemValueObject } from '../../domain/value-objects/order-item.value-object';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderInfrastructureMapper {
    mapToDomain(dto: any): OrderAggregate {
        // Soporte para formato anidado (antiguo) o plano (nuevo DTO)
        const orderData = dto.order || dto;

        const entity = new OrderEntity(
            dto.id || orderData.id, // Prioritize top-level ID for json-server compatibility
            orderData.customerId || dto.customerId,
            orderData.totalAmount || dto.total || 0,
            (orderData.status || 'PENDING') as 'PENDING' | 'CONFIRMED' | 'SHIPPED',
            new Date(orderData.createdAt || dto.createdAt || new Date())
        );

        const itemsRaw = dto.items || orderData.items || [];
        const items = itemsRaw.map((i: any) => new OrderItemValueObject(
            i.productId,
            i.productName || 'Producto',
            i.quantity,
            i.price
        ));

        return new OrderAggregate(entity, items);
    }

    mapToDto(domain: OrderAggregate): OrderDto {
        return {
            id: domain.order.id,
            customerId: domain.order.customerId,
            total: domain.order.totalAmount,
            status: domain.order.status,
            createdAt: domain.order.createdAt.toISOString(),
            items: domain.items.map(i => ({
                productId: i.productId,
                quantity: i.quantity,
                price: i.price
            }))
        };
    }
}
