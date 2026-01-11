import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetOrdersByCustomerUseCase, OrderAggregate, User, AuthActions, selectAuthUser, UserRole } from 'clothing-core';
import { tap } from 'rxjs';

@Injectable()
export class ProfilePresenter {
    private store = inject(Store);
    private getOrdersByCustomerUseCase = inject(GetOrdersByCustomerUseCase);

    private _orders = signal<OrderAggregate[]>([]);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    readonly user$ = this.store.select(selectAuthUser).pipe(
        tap(user => {
            if (user && this._orders().length === 0 && !this._loading()) {
                this.loadOrders(user.id);
            }
        })
    );

    readonly UserRole = UserRole;
    readonly orders = this._orders.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    logout() {
        this.store.dispatch(AuthActions.logout());
    }

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
