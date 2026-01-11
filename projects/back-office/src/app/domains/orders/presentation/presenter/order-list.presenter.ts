import { Injectable, inject } from '@angular/core';
import { OrderAggregate } from 'clothing-core';
import { BasePresenterWithSignals } from '../../../../shared/presenters/base/base-signals.presenter';
import { GetAllOrdersUseCase } from '../../application/use-cases/get-all-orders.usecase';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/update-order-status.usecase';

@Injectable()
export class OrderListPresenter extends BasePresenterWithSignals<OrderAggregate[]> {
    private getAllOrdersUseCase = inject(GetAllOrdersUseCase);
    private updateOrderStatusUseCase = inject(UpdateOrderStatusUseCase);

    loadOrders(): void {
        this.setLoading(true);
        this.getAllOrdersUseCase.execute().subscribe({
            next: (orders) => {
                this.setData(orders);
            },
            error: (error) => {
                this.setError('Error al cargar la lista de pedidos.');
                console.error(error);
            }
        });
    }

    onOrderAction(order: OrderAggregate): void {
        this.log('Confirming order', order.order.id);
        this.setLoading(true);
        this.updateOrderStatusUseCase.execute(order, 'CONFIRMED').subscribe({
            next: () => {
                this.loadOrders(); // Recargar lista
            },
            error: (err) => {
                this.setError('Error al actualizar el pedido');
                this.setLoading(false);
            }
        });
    }
}
