import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredProducts, selectProductIsLoading, ProductActions, Product, CartActions, selectSelectedCategory, selectTotal, selectPage, selectPageSize } from 'clothing-core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-shop-container',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters (Desktop) -->
          <aside class="hidden lg:block w-64 flex-shrink-0 bg-white p-6 rounded-lg border border-slate-200">
            <h3 class="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Filtros</h3>
            
            <div class="mb-8">
              <h4 class="text-xs font-semibold text-slate-700 uppercase mb-4">Categorías</h4>
              <ul class="space-y-3">
                @for (cat of categories; track cat.id) {
                  <li 
                    (click)="setCategory(cat.value)"
                    class="flex items-center gap-3 text-sm transition-all duration-200 cursor-pointer group"
                    [class.text-primary]="(selectedCategory$ | async) === cat.value"
                    [class.font-bold]="(selectedCategory$ | async) === cat.value"
                    [class.text-slate-600]="(selectedCategory$ | async) !== cat.value">
                    <span 
                      class="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      [class.bg-primary]="(selectedCategory$ | async) === cat.value"
                      [class.scale-125]="(selectedCategory$ | async) === cat.value"
                      [class.bg-slate-300]="(selectedCategory$ | async) !== cat.value"
                      [class.group-hover:bg-primary/50]="(selectedCategory$ | async) !== cat.value">
                    </span>
                    {{ cat.label }}
                  </li>
                }
              </ul>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="flex-grow">
            <!-- Mobile Filters (Toggle) -->
            <div class="lg:hidden flex items-center justify-between bg-white p-4 mb-6 rounded-lg border border-slate-200">
               <span class="text-sm font-bold text-slate-900">Resultados</span>
               <button class="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-md text-xs font-bold uppercase tracking-widest">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                 Filtrar
               </button>
            </div>

            <div class="flex justify-between items-end mb-8">
              <div>
                <h2 class="text-2xl font-display font-bold text-slate-950">Catálogo de Productos</h2>
                <div class="flex items-center gap-2 mt-1">
                  <p class="text-slate-500 text-xs uppercase tracking-wider">Mostrando lo último en tendencias</p>
                  @if (total$ | async; as total) {
                    <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <p class="text-slate-900 text-xs font-bold">{{ total }} productos encontrados</p>
                  }
                </div>
              </div>
            </div>
            
            @if (isLoading$ | async) {
              <div class="flex justify-center items-center py-40">
                <div class="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
              </div>
            } @else {
              <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                @for (product of products$ | async; track product.id) {
                  <app-product-card 
                      [product]="product"
                      (addToCart)="addToCart($event)">
                  </app-product-card>
                } @empty {
                  <div class="col-span-full py-20 text-center">
                    <p class="text-slate-400 font-medium">No se encontraron productos que coincidan con los filtros.</p>
                  </div>
                }
              </div>

              <!-- Pagination Controls -->
              @if ({ page: page$ | async, total: total$ | async, pageSize: pageSize$ | async }; as vm) {
                <div class="mt-12 flex flex-col items-center gap-6 py-8 border-t border-slate-100">
                  <div class="flex items-center gap-1">
                    <button 
                      (click)="changePage(vm.page! - 1)"
                      [disabled]="vm.page === 1"
                      class="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    
                    <div class="flex items-center px-4">
                      <span class="text-sm font-bold text-slate-900">Página {{ vm.page }}</span>
                      <span class="mx-2 text-slate-300">/</span>
                      <span class="text-sm text-slate-500">{{ Math.ceil((vm.total || 0) / (vm.pageSize || 12)) }}</span>
                    </div>

                    <button 
                      (click)="changePage(vm.page! + 1)"
                      [disabled]="vm.page === Math.ceil((vm.total || 0) / (vm.pageSize || 12))"
                      class="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                  
                  <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Mostrando del {{ ((vm.page! - 1) * vm.pageSize!) + 1 }} al {{ Math.min(vm.page! * vm.pageSize!, vm.total!) }} de {{ vm.total }}
                  </p>
                </div>
              }
            }
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ShopContainerComponent implements OnInit {
  private store = inject(Store);
  Math = Math;

  products$ = this.store.select(selectFilteredProducts);
  isLoading$ = this.store.select(selectProductIsLoading);
  selectedCategory$ = this.store.select(selectSelectedCategory);
  total$ = this.store.select(selectTotal);
  page$ = this.store.select(selectPage);
  pageSize$ = this.store.select(selectPageSize);

  categories = [
    { id: 'all', label: 'Todo', value: null },
    { id: 'electronics', label: 'Electrónica', value: 'electronics' },
    { id: 'men', label: 'Ropa Hombre', value: "men's clothing" },
    { id: 'women', label: 'Ropa Mujer', value: "women's clothing" },
    { id: 'jewelry', label: 'Joyería', value: 'jewelery' },
  ];

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts({
      pagination: { page: 1, pageSize: 12 }
    }));
  }

  changePage(page: number) {
    this.store.dispatch(ProductActions.loadProducts({
      pagination: { page, pageSize: 12 }
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setCategory(category: string | null) {
    this.store.dispatch(ProductActions.setCategory({ category }));
    // Reset to page 1 when category changes
    this.store.dispatch(ProductActions.loadProducts({
      pagination: { page: 1, pageSize: 12 }
    }));
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addItem({
      item: {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      }
    }));
  }
}
