import { Injectable, inject, signal } from '@angular/core';
import { GetOrdersByCustomerUseCase, OrderAggregate, User } from 'clothing-core';

@Injectable()
export class ProfilePresenter {
    private getOrdersByCustomerUseCase = inject(GetOrdersByCustomerUseCase);

    private _orders = signal<OrderAggregate[]>([]);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    readonly orders = this._orders.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    loadOrders(userId: string): void {
        this._loading.set(true);
        this.getOrdersByCustomerUseCase.execute(userId).subscribe({
            next: (orders) => {
                this._orders.set(orders);
                this._loading.set(false);
            },
            error: (err) => {
                this._error.set('Error al cargar tus compras.');
                this._loading.set(false);
                console.error(err);
            }
        });
    }
}
