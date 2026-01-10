import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from 'clothing-core';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, CurrencyPipe],
    template: `
    <div class="group relative bg-white border border-slate-100 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-slate-200 rounded-lg overflow-hidden">
      <!-- Badges -->
      <div class="absolute top-2 left-2 z-20 flex flex-col gap-1">
        <span class="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Oferta</span>
        @if (product?.price && product!.price < 50) {
          <span class="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Envío Gratis</span>
        }
      </div>

      <!-- Image Container -->
      <div class="relative aspect-[3/4] sm:aspect-square md:aspect-[3/4] bg-white overflow-hidden p-6 sm:p-10">
        @if (product?.imageUrl) {
          <img 
            [src]="product?.imageUrl" 
            [alt]="product?.name"
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          >
        } @else {
          <div class="w-full h-full bg-slate-50 flex items-center justify-center">
            <span class="text-slate-300 text-xs">Sin imagen</span>
          </div>
        }
        @if (product?.stock === 0) {
          <span class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center text-slate-900 text-xs font-bold uppercase z-10">Agotado</span>
        }
        
        <!-- Quick Actions (Back Office specific could be different, but keeping style) -->
        <div class="absolute inset-x-0 bottom-0 p-3 translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-white via-white/90 to-transparent flex gap-2">
          <button 
            (click)="onAction()" 
            class="flex-1 bg-slate-900 text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-bold py-3 px-2 hover:bg-slate-700 transition-all active:scale-[0.98]">
            Ver
          </button>
          <button 
            (click)="onEdit($event)" 
            class="flex-1 bg-white border border-slate-200 text-slate-900 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold py-3 px-2 hover:bg-slate-50 transition-all active:scale-[0.98]">
            Editar
          </button>
        </div>
      </div>

      <!-- Info Container -->
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <p class="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{{ product?.category || 'General' }}</p>
        <h3 class="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-primary transition-colors">{{ product?.name }}</h3>
        
        <!-- Pricing & Stock -->
        <div class="mt-auto pt-4 border-t border-slate-50">
          <div class="flex items-center justify-between">
            <div class="flex items-baseline gap-2">
              <span class="text-lg sm:text-xl font-bold text-slate-900 tracking-tighter">{{ product?.price | currency }}</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[9px] uppercase font-bold" [ngClass]="product?.stock && product!.stock > 10 ? 'text-green-600' : 'text-orange-600'">
                Stock: {{ product?.stock || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class ProductCardComponent {
    @Input() product: Product | undefined;
    @Output() action = new EventEmitter<Product>();
    @Output() edit = new EventEmitter<Product>();

    onAction() {
        if (this.product) {
            this.action.emit(this.product);
        }
    }

    onEdit(event: Event) {
        event.stopPropagation();
        if (this.product) {
            this.edit.emit(this.product);
        }
    }
}
