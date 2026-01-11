import { Injectable, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {
    selectItems,
    CartActions,
    OrderActions,
    CartItem,
    OrderFactory,
    NotificationService,
    selectAuthUser
} from 'clothing-core';

@Injectable()
export class CartPresenter {
    private store = inject(Store);
    private router = inject(Router);
    private notification = inject(NotificationService);

    readonly cartItems$ = this.store.select(selectItems);
    readonly user$ = this.store.select(selectAuthUser);

    goShop() {
        this.router.navigate(['/shop']);
    }

    removeItem(productId: string) {
        this.store.dispatch(CartActions.removeItem({ productId }));
    }

    calculateTotal(items: CartItem[] | null): number {
        return items ? items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
    }

    checkout(items: CartItem[] | null) {
        if (!items || items.length === 0) return;

        this.user$.pipe(take(1)).subscribe(user => {
            if (!user) {
                this.notification.error('Debe iniciar sesión para realizar una compra');
                this.router.navigate(['/login']);
                return;
            }

            // Create Order Aggregate using Factory
            const orderAggregate = OrderFactory.createFromCart(items, user.id);

            // Dispatch Create Order
            this.store.dispatch(OrderActions.createOrder({ order: orderAggregate }));

            // Clear Cart
            this.store.dispatch(CartActions.clearCart());

            // Feedback & Redirect
            this.notification.success('¡Pedido realizado con éxito!');
            this.router.navigate(['/shop']);
        });
    }
}
