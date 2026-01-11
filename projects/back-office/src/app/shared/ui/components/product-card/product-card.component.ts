import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from 'clothing-core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="group relative glass rounded-[2rem] border border-white/50 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:border-white shadow-xl overflow-hidden bg-white/30 backdrop-blur-md">
      <!-- Status Badges -->
      <div class="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <span class="bg-slate-950 text-accent-gold text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg">
            {{ product?.category || 'General' }}
        </span>
        @if (product?.stock && product!.stock <= 5) {
          <span class="bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] backdrop-blur-md">
            Bajo Stock
          </span>
        }
      </div>

      <!-- Image Display -->
      <div class="relative aspect-square bg-white/40 overflow-hidden p-8 flex items-center justify-center">
        @if (product?.imageUrl) {
          <img 
            [src]="product?.imageUrl" 
            [alt]="product?.name"
            class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
          >
        } @else {
          <div class="w-full h-full bg-slate-100/50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
            <span class="text-slate-300 text-[9px] font-black uppercase tracking-widest">Sin Imagen</span>
          </div>
        }
        
        <!-- Management Actions Overaly -->
        <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 flex items-center justify-center gap-3">
          <button 
            (click)="onAction()" 
            class="px-5 py-2.5 bg-white text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-accent-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
            Vista Previa
          </button>
          <button 
            (click)="onEdit($event)" 
            class="px-5 py-2.5 bg-accent-gold text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-slate-950 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
            Modificar
          </button>
        </div>
      </div>

      <!-- Detail Section -->
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-xs font-display font-black text-slate-950 line-clamp-2 min-h-[2rem] mb-4 group-hover:text-accent-gold transition-colors leading-relaxed">
            {{ product?.name }}
        </h3>
        
        <div class="mt-auto pt-4 border-t border-slate-950/5 flex items-center justify-between">
            <div class="flex flex-col">
                <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Valoración</span>
                <span class="text-sm font-display font-black text-slate-950">{{ product?.price | currency:'USD' }}</span>
            </div>
            <div class="text-right">
                <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Inventario</span>
                <span class="text-xs font-black" [ngClass]="product?.stock && product!.stock > 10 ? 'text-slate-950' : 'text-red-500'">
                    {{ product?.stock || 0 }} <span class="text-[9px] opacity-40">unidades</span>
                </span>
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
