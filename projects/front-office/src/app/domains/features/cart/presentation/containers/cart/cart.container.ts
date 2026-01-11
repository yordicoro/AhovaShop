import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPresenter } from '../../presenters/cart.presenter';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [CommonModule],
    providers: [CartPresenter],
    template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Main Cart items -->
        <div class="flex-grow">
            <div class="flex items-center gap-3 mb-10">
                <div class="w-8 h-px bg-slate-900"></div>
                <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">Tu Bolsa Curada</h2>
            </div>
    
            <div *ngIf="presenter.cartItems$ | async as cartItems" class="space-y-6">
                <div *ngIf="cartItems.length > 0; else emptyCart" class="space-y-4">
                    <div class="glass rounded-3xl overflow-hidden border border-white/40 shadow-xl" 
                         *ngFor="let item of cartItems">
                        <div class="cart-item group p-6 flex items-center justify-between gap-6 hover:bg-white/40 transition-all duration-500">
                            
                            <div class="flex items-center gap-6">
                                <div class="h-24 w-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200/50">
                                     <img *ngIf="item.imageUrl" [src]="item.imageUrl" [alt]="item.productName" class="w-full h-full object-contain p-2">
                                     <svg *ngIf="!item.imageUrl" class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                </div>
                                <div class="space-y-1">
                                    <h4 class="font-display font-bold text-slate-950 tracking-tight">{{ item.productName }}</h4>
                                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ item.price | currency }} &times; {{ item.quantity }}</p>
                                    <p class="text-[9px] text-accent-gold font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                                        <span class="w-4 h-px bg-accent-gold/30"></span> Listo para envío
                                    </p>
                                </div>
                            </div>
                        
                            <div class="flex flex-col items-end gap-2">
                                <span class="text-lg font-display font-bold text-slate-950">{{ (item.price * item.quantity) | currency }}</span>
                                <button (click)="presenter.removeItem(item.productId)" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
                                    ELIMINAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary -->
        <div *ngIf="presenter.cartItems$ | async as cartItems">
            <div *ngIf="cartItems.length > 0" class="lg:w-96">
                <div class="sticky top-32 glass-dark rounded-3xl p-10 border border-white/10 shadow-2xl text-golden">
                    <h3 class="text-[11px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-10">Resumen de Compra</h3>
                    
                    <div class="space-y-6 mb-10">
                        <div class="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-900">Subtotal</span>
                            <span class="text-lg font-display font-bold">{{ presenter.calculateTotal(cartItems) | currency }}</span>
                        </div>
                        <div class="flex justify-between items-center p-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-900">IVA (Estimado)</span>
                            <span class="text-sm font-bold">$0.00</span>
                        </div>
                        <div class="flex justify-between items-center p-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-900">Envío</span>
                            <span class="text-[10px] font-black uppercase tracking-widest text-accent-gold">Cortesía</span>
                        </div>
                    </div>

                    <div class="border-t border-white/10 pt-8 mb-10 flex justify-between items-end">
                         <div>
                            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 block mb-1">Total a Pagar</span>
                            <span class="text-4xl font-display font-black text-White-500 tracking-tighter">{{ presenter.calculateTotal(cartItems) | currency }}</span>
                         </div>
                    </div>
                    
                    <button class="
                    w-full btn-gold py-5 
                    overflow-hidden
                    rounded-3xl
                    hover:scale-105
                    transition-all duration-300 ease-in-out
                    hover:shadow-accent-gold/80
                    hover:bg-accent-gold/10
                    shadow-2xl
                    shadow-accent-gold/80" 
                    (click)="presenter.checkout(cartItems)"
                    >
                        Realizar Pedido
                    </button>

                    <div class="mt-8 pt-8 border-t border-white/10 text-center">
                        <p class="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                            Pago Seguro Garantizado &bull; Envío Global
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <ng-template #emptyCart>
             <div class="flex flex-col items-center justify-center py-40 glass rounded-[3rem] border border-dashed border-slate-300 w-full">
                <div class="relative mb-10 group">
                    <div class="absolute inset-0 bg-slate-900 rounded-3xl rotate-12 scale-110 opacity-5 group-hover:rotate-45 transition-transform duration-700"></div>
                    <div class="relative h-24 w-24 glass flex items-center justify-center rounded-3xl shadow-xl">
                        <svg class="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                </div>
                <h3 class="text-xl font-display font-black text-slate-950 mb-3 tracking-tight">Tu bolsa está vacía</h3>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">Comience su viaje hacia el lujo</p>
                <button (click)="presenter.goShop()" class="btn-primary">
                    Entrar a la Boutique
                </button>
            </div>
        </ng-template>
      </div>
    </div>
  `,
    styles: []
})
export class CartPageComponent {
    protected presenter = inject(CartPresenter);
}
