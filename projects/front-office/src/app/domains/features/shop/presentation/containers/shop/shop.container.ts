import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ShopPresenter } from '../../presenters/shop.presenter';

@Component({
  selector: 'app-shop-container',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ShopPresenter],
  template: `
    <div class="bg-slate-50 min-h-screen pt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-12">
          
          <!-- Sidebar Filters (Luxury Glass) -->
          <aside class="hidden lg:block w-72 flex-shrink-0">
            <div class="sticky top-32 glass rounded-3xl p-8 border border-white/40 shadow-xl">
                <div class="flex items-center gap-3 mb-10">
                    <div class="w-8 h-px bg-slate-900"></div>
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Catálogo</h3>
                </div>
                
                <div class="mb-12">
                    <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Colecciones</h4>
                    <ul class="space-y-4">
                        @for (cat of presenter.categories; track cat.id) {
                        <li 
                            (click)="presenter.setCategory(cat.value)"
                            class="flex items-center gap-4 text-xs tracking-wide transition-all duration-300 cursor-pointer group"
                            [class.text-slate-950]="(presenter.selectedCategory$ | async) === cat.value"
                            [class.font-bold]="(presenter.selectedCategory$ | async) === cat.value"
                            [class.text-slate-400]="(presenter.selectedCategory$ | async) !== cat.value">
                            <div 
                                class="w-1.5 h-1.5 rounded-full border border-slate-200 transition-all duration-300 group-hover:bg-accent-gold group-hover:scale-150"
                                [class.bg-accent-gold]="(presenter.selectedCategory$ | async) === cat.value"
                                [class.border-accent-gold]="(presenter.selectedCategory$ | async) === cat.value">
                            </div>
                            <span class="group-hover:translate-x-1 transition-transform">{{ cat.label }}</span>
                        </li>
                        }
                    </ul>
                </div>

                <!-- Featured Badge -->
                <div class="bg-slate-950 rounded-2xl p-6 text-white overflow-hidden relative group cursor-pointer">
                    <div class="absolute top-0 right-0 w-20 h-20 bg-accent-gold/20 blur-2xl group-hover:bg-accent-gold/40 transition-all"></div>
                    <p class="text-[8px] font-bold uppercase tracking-widest text-accent-gold mb-2">Exclusivo</p>
                    <p class="text-sm font-display font-medium mb-4">Nueva Colección Invierno '26</p>
                    <button class="text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1 group/btn">
                        Descubrir <svg class="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="flex-grow">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div class="space-y-2">
                <nav class="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    <span class="hover:text-slate-900 cursor-pointer">Tienda</span>
                    <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span class="text-slate-950">Lujo</span>
                </nav>
                <h2 class="text-4xl font-display font-black text-slate-950 tracking-tighter">Selección Esencial</h2>
                @if (presenter.total$ | async; as total) {
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{{ total }} Piezas Únicas Disponibles</p>
                }
              </div>

              <!-- Refined Sort -->
              <div class="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Ordenar por:</span>
                  <select class="text-xs font-bold text-slate-900 bg-transparent border-none focus:ring-0 cursor-pointer pr-8">
                      <option>Últimas Novedades</option>
                      <option>Precio: Menor a Mayor</option>
                      <option>Precio: Mayor a Menor</option>
                  </select>
              </div>
            </div>
            
            @if (presenter.isLoading$ | async) {
              <div class="flex justify-center items-center py-40">
                <div class="w-12 h-12 border-2 border-slate-100 border-t-accent-gold rounded-full animate-spin"></div>
              </div>
            } @else {
              <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                @for (product of presenter.products$ | async; track product.id) {
                  <app-product-card 
                      [product]="product"
                      (addToCart)="presenter.addToCart($event)">
                  </app-product-card>
                } @empty {
                  <div class="col-span-full py-40 text-center glass rounded-3xl">
                    <p class="text-slate-400 font-display text-lg">No se encontraron artículos que coincidan con su búsqueda.</p>
                  </div>
                }
              </div>

              <!-- Pagination (Premium Aesthetic) -->
              @if ({ page: presenter.page$ | async, total: presenter.total$ | async, pageSize: presenter.pageSize$ | async }; as vm) {
                <div class="mt-20 flex justify-center pb-20">
                  <div class="inline-flex items-center gap-8 bg-white px-8 py-4 rounded-full border border-slate-100 shadow-xl">
                    <button 
                      (click)="presenter.changePage(vm.page! - 1)"
                      [disabled]="vm.page === 1"
                      class="text-slate-500 hover:text-slate-950 disabled:opacity-20 transition-all font-bold uppercase text-[10px] tracking-widest">
                      Ant.
                    </button>
                    
                    <div class="flex items-center gap-4">
                        @for (p of [].constructor(presenter.Math.ceil((vm.total || 0) / (vm.pageSize || 12))); track $index) {
                            <span 
                                (click)="presenter.changePage($index + 1)"
                                class="w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300"
                                [class.bg-accent-gold]="vm.page === ($index + 1)"
                                [class.scale-150]="vm.page === ($index + 1)"
                                [class.bg-slate-200]="vm.page !== ($index + 1)">
                            </span>
                        }
                    </div>

                    <button 
                      (click)="presenter.changePage(vm.page! + 1)"
                      [disabled]="vm.page === presenter.Math.ceil((vm.total || 0) / (vm.pageSize || 12))"
                      class="text-slate-500 hover:text-slate-950 disabled:opacity-20 transition-all font-bold uppercase text-[10px] tracking-widest">
                      Sig.
                    </button>
                  </div>
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
  protected presenter = inject(ShopPresenter);

  ngOnInit() {
    this.presenter.initialize();
  }
}
