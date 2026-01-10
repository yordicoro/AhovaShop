import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { ProductListPresenter } from '../../presenter/product-list.presenter';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, RouterLink],
    providers: [ProductListPresenter],
    template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Inventario de Productos</h1>
          <p class="text-slate-500 mt-1">Gestiona y supervisa el stock de tu tienda</p>
        </div>
        <button [routerLink]="['/inventory/new']" class="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
          <span>+</span> Nuevo Producto
        </button>
      </div>

      @if (presenter.loading()) {
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          @for (product of presenter.data(); track presenter.trackById($index, product)) {
            <app-product-card 
              [product]="product" 
              (action)="presenter.onViewDetail($event)"
              (edit)="presenter.onEdit($event)"
            />
          } @empty {
            @if (!presenter.error()) {
              <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
                 <span class="text-4xl mb-4">📦</span>
                 <p class="text-slate-500 font-medium">No hay productos en el inventario</p>
              </div>
            }
          }
        </div>
        
        @if (presenter.error()) {
          <div class="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
            <div class="flex">
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ presenter.error() }}
                </p>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
    styles: []
})
export class ProductsListPage implements OnInit {
    constructor(protected presenter: ProductListPresenter) { }

    ngOnInit() {
        this.presenter.loadProducts();
    }
}

