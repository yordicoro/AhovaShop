import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'clothing-core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100/50 hover:border-accent-gold/30 flex flex-col h-full">
      <!-- Badges -->
      <div class="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        <span class="bg-primary text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg backdrop-blur-md bg-opacity-90">Tendencia</span>
        @if (product?.price && product!.price > 100) {
          <span class="bg-accent-gold text-slate-900 text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Opción Premium</span>
        }
      </div>

      <!-- Image Container -->
      <div class="relative aspect-[4/5] bg-slate-50 overflow-hidden flex items-center justify-center p-8 sm:p-12">
        <div class="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent"></div>
        
        @if (currentImage) {
          <img 
            [src]="currentImage" 
            [alt]="product?.name"
            class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
          >
        }
        
        <!-- Image Dots (Elegant) -->
        @if (product?.images; as images) {
          @if (images.length > 1) {
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              @for (img of images; track $index) {
                <span 
                  class="w-1 h-1 rounded-full transition-all duration-300"
                  [class.bg-accent-gold]="currentImageIndex === $index"
                  [class.scale-125]="currentImageIndex === $index"
                  [class.bg-slate-300]="currentImageIndex !== $index">
                </span>
              }
            </div>
          }
        }

        @if (product?.stock === 0) {
          <span class="absolute inset-0 bg-slate-950/40 backdrop-blur-[4px] flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest z-10">Agotado</span>
        }
        
        <!-- Quick Action Button (Premium Glass) -->
        <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <button 
            (click)="onAddToCart()" 
            [disabled]="!product || product.stock === 0"
            class="w-full glass-dark text-accent-gold text-[9px] uppercase tracking-[0.2em] font-bold py-3 px-4 hover:bg-white hover:text-slate-900 transition-all active:scale-[0.98] disabled:opacity-50 rounded-xl border border-white/10 shadow-2xl">
            Añadir a la bolsa
          </button>
        </div>
      </div>

      <!-- Info Container -->
      <div class="p-6 flex flex-col flex-grow bg-white">
        <div class="flex justify-between items-start mb-2">
            <p class="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">{{ product?.brand || 'Ahova' }}</p>
            <div class="flex gap-1">
                <span class="w-2 h-2 rounded-full border border-slate-200" style="background-color: #000"></span>
                <span class="w-2 h-2 rounded-full border border-slate-200" style="background-color: #fff"></span>
            </div>
        </div>
        
        <h3 class="text-sm font-display font-medium text-slate-900 line-clamp-1 mb-3 hover:text-accent-gold transition-colors cursor-pointer">{{ product?.name }}</h3>
        
        <!-- Pricing & Loyalty -->
        <div class="mt-auto pt-4 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-baseline gap-2">
                <span class="text-lg font-display font-bold text-slate-950 tracking-tighter">{{ product?.price | currency }}</span>
                @if (product?.price && product!.price > 50) {
                    <span class="text-[10px] text-slate-300 line-through font-medium">{{ (product?.price || 0) * 1.25 | currency }}</span>
                }
            </div>
          </div>
          <div class="flex items-center gap-1.5">
              <span class="w-3 h-px bg-slate-200"></span>
              <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Recompensas +{{ (product?.price || 0) * 5 | number:'1.0-0' }} Puntos</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();

  currentImageIndex = 0;

  get currentImage(): string | undefined {
    if (this.product?.images?.length) {
      return this.product.images[this.currentImageIndex];
    }
    return this.product?.imageUrl;
  }

  nextImage(event: Event) {
    event.stopPropagation();
    if (this.product?.images?.length) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage(event: Event) {
    event.stopPropagation();
    if (this.product?.images?.length) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  onAddToCart() {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }
}
