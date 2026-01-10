import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectItems, CartActions, OrderActions, CartItem, OrderFactory, NotificationService } from 'clothing-core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-8">Your Shopping Cart</h2>

      <div *ngIf="cartItems$ | async as cartItems" class="space-y-8">
        <div *ngIf="cartItems.length > 0; else emptyCart">
            <div class="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div class="cart-item group p-6 flex items-center justify-between border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors" 
                    *ngFor="let item of cartItems">
                    
                    <div class="flex items-center gap-4">
                        <div class="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div class="item-info">
                            <h4 class="font-semibold text-slate-900">{{ item.productName }}</h4>
                            <p class="text-sm text-slate-500">{{ item.price | currency }} x {{ item.quantity }}</p>
                        </div>
                    </div>
                
                    <div class="item-actions">
                        <button (click)="removeItem(item.productId)" class="text-red-500 hover:text-red-700 text-sm font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <div class="cart-summary mt-8 flex flex-col items-end">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-80">
                    <div class="flex justify-between mb-4">
                        <span class="text-slate-500">Subtotal</span>
                        <span class="font-semibold text-slate-900">{{ calculateTotal(cartItems) | currency }}</span>
                    </div>
                    <div class="flex justify-between mb-6">
                        <span class="text-slate-500">Shipping</span>
                        <span class="text-green-600 font-medium">Free</span>
                    </div>
                    <div class="border-t border-slate-100 pt-4 mb-6 flex justify-between items-center">
                         <span class="text-lg font-bold text-slate-900">Total</span>
                         <span class="text-2xl font-bold text-primary">{{ calculateTotal(cartItems) | currency }}</span>
                    </div>
                    
                    <button class="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-secondary transition-all shadow-lg shadow-primary/25 active:scale-[0.98]" (click)="checkout(cartItems)">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
        
        <ng-template #emptyCart>
             <div class="empty-cart text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                <div class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 mb-6">
                    <svg class="h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 class="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h3>
                <p class="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
                <button (click)="goShop()" class="text-primary font-semibold hover:text-secondary transition-colors">Start Shopping &rarr;</button>
            </div>
        </ng-template>
      </div>
    </div>
  `,
    styles: []
})
export class CartPageComponent {
    private store = inject(Store);
    private router = inject(Router);

    cartItems$ = this.store.select(selectItems);

    goShop() {
        this.router.navigate(['/shop']);
    }

    removeItem(productId: string) {
        this.store.dispatch(CartActions.removeItem({ productId }));
    }

    calculateTotal(items: CartItem[] | null): number {
        return items ? items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
    }

    private notification = inject(NotificationService);

    checkout(items: CartItem[] | null) {
        if (!items || items.length === 0) return;

        // 1. Create Order Aggregate using Factory (Point 10)
        const orderAggregate = OrderFactory.createFromCart(items, 'guest-user-123');

        // 2. Dispatch Create Order
        this.store.dispatch(OrderActions.createOrder({ order: orderAggregate }));

        // 3. Clear Cart
        this.store.dispatch(CartActions.clearCart());

        // 4. Feedback & Redirect (Point 06)
        this.notification.success('¡Pedido realizado con éxito!');
        this.router.navigate(['/shop']);
    }
}
