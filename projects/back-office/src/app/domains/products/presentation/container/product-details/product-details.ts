import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailsPresenter } from '../../presenter/product-details.presenter';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  providers: [ProductDetailsPresenter],
  template: `
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Back Button & Breadcrumbs -->
      <nav class="flex items-center gap-2 text-slate-500 text-sm mb-8">
        <a routerLink="/inventory" class="hover:text-slate-900 transition-colors flex items-center gap-1">
          <span class="text-lg">←</span> Volver al Inventario
        </a>
      </nav>

      @if (presenter.loading()) {
        <div class="flex flex-col justify-center items-center h-96 gap-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          <p class="text-slate-500 font-medium">Cargando detalles del producto...</p>
        </div>
      } @else if (presenter.error()) {
        <div class="bg-red-50 border-2 border-red-100 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12">
           <span class="text-4xl mb-4 block">❌</span>
           <h3 class="text-lg font-bold text-red-900 mb-2">Error al cargar</h3>
           <p class="text-red-700">{{ presenter.error() }}</p>
           <button routerLink="/inventory" class="mt-6 bg-red-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-800 transition-all">
             Volver al Inventario
           </button>
        </div>
      } @else if (presenter.data(); as product) {
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            
            <!-- Image Section -->
            <div class="bg-slate-50 p-12 flex items-center justify-center border-r border-slate-100">
              <div class="relative group">
                <img 
                  [src]="product.imageUrl" 
                  [alt]="product.name"
                  class="max-w-full max-h-[500px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                >
                @if (product.stock === 0) {
                  <span class="absolute top-0 right-0 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Agotado</span>
                }
              </div>
            </div>

            <!-- Content Section -->
            <div class="p-10 lg:p-16 flex flex-col">
              <div class="mb-8">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block">{{ product.category }}</span>
                <h1 class="text-4xl font-bold text-slate-900 leading-tight mb-4">{{ product.name }}</h1>
                <div class="flex items-center gap-4">
                  <span class="text-3xl font-bold text-slate-900 tracking-tighter">{{ product.price | currency }}</span>
                  <div class="h-6 w-px bg-slate-200"></div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                    Stock: {{ product.stock }}
                  </span>
                </div>
              </div>

              <div class="prose prose-slate mb-12">
                <h3 class="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Descripción</h3>
                <p class="text-slate-600 leading-relaxed text-lg">
                  {{ product.description || 'Este producto es una pieza exclusiva de nuestra colección, diseñada con materiales de alta calidad y pensada para ofrecer comodidad y estilo en cualquier ocasión.' }}
                </p>
              </div>

              <div class="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  [routerLink]="['/inventory/edit', product.id]"
                  class="bg-slate-900 text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]">
                  Editar Producto
                </button>
                <button class="bg-white text-red-600 border-2 border-red-100 py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-50 transition-all active:scale-[0.98]">
                  Eliminar del Inventario
                </button>
              </div>

              <!-- Extra Info Hooks -->
              <div class="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-8">
                <div>
                   <span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">SKU</span>
                   <span class="text-sm font-medium text-slate-900">CH-{{ product.id.substring(0,6).toUpperCase() }}</span>
                </div>
                <div>
                   <span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Creado</span>
                   <span class="text-sm font-medium text-slate-900">08 Ene, 2026</span>
                </div>
                <div>
                   <span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Estado</span>
                   <span class="text-sm font-bold uppercase text-green-600">Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  protected presenter = inject(ProductDetailsPresenter);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.presenter.loadProduct(id);
    } else {
      this.presenter.setError('No se proporcionó un ID de producto válido.');
    }
  }
}
