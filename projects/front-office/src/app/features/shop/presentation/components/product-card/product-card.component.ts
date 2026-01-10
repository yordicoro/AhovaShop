import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'clothing-core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative bg-white border border-slate-100 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-slate-200">
      <!-- Badges -->
      <div class="absolute top-2 left-2 z-20 flex flex-col gap-1">
        <span class="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Oferta</span>
        @if (product?.price && product!.price < 50) {
          <span class="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Envío Gratis</span>
        }
      </div>

      <!-- Image Container -->
      <div class="relative aspect-[3/4] sm:aspect-square md:aspect-[3/4] bg-white overflow-hidden p-6 sm:p-10">
        @if (currentImage) {
          <img 
            [src]="currentImage" 
            [alt]="product?.name"
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          >
        }
        
        @if (product?.images; as images) {
          @if (images.length > 1) {
            <!-- Image Controls -->
            <div class="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button (click)="prevImage($event)" class="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button (click)="nextImage($event)" class="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
            
            <!-- Dots -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              @for (img of images; track $index) {
                <span 
                  class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  [class.bg-slate-900]="currentImageIndex === $index"
                  [class.w-3]="currentImageIndex === $index"
                  [class.bg-slate-300]="currentImageIndex !== $index">
                </span>
              }
            </div>
          }
        }

        @if (product?.stock === 0) {
          <span class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center text-slate-900 text-xs font-bold uppercase z-10">Agotado</span>
        }
        
        <!-- Add to Cart (Quick View Overlay style) -->
        <div class="absolute inset-x-0 bottom-0 p-3 translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-white via-white/90 to-transparent">
          <button 
            (click)="onAddToCart()" 
            [disabled]="!product || product.stock === 0"
            class="w-full bg-slate-900 text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-bold py-3 px-2 hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50">
            Añadir a la bolsa
          </button>
        </div>
      </div>

      <!-- Info Container -->
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <p class="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{{ product?.category || 'General' }}</p>
        <h3 class="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-primary transition-colors">{{ product?.name }}</h3>
        
        <!-- Pricing -->
        <div class="mt-auto pt-4 border-t border-slate-50">
          <div class="flex items-baseline gap-2">
            <span class="text-lg sm:text-xl font-bold text-slate-900 tracking-tighter">{{ product?.price | currency }}</span>
            <span class="text-[10px] sm:text-xs text-slate-400 line-through font-medium">{{ (product?.price || 0) * 1.3 | currency }}</span>
          </div>
          <p class="text-[9px] text-green-600 font-bold uppercase tracking-tighter mt-1">Socio Luxe +100 Puntos</p>
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
