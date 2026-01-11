import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/ui/components/product-card/product-card.component';
import { ProductListPresenter } from '../../presenter/product-list.presenter';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  providers: [ProductListPresenter],
  template: `
    <div class="px-8 py-12 bg-slate-50 min-h-screen">
      <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div class="space-y-1">
          <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Gestión de Inventario</h2>
          <h1 class="text-4xl font-display font-black text-slate-950 tracking-tight">Archivo de Productos</h1>
        </div>
        <button [routerLink]="['/inventory/new']" class="btn-gold px-8 py-4 shadow-2xl shadow-accent-gold/20 group">
          <span class="flex items-center gap-3">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              <span class="text-[10px] font-black uppercase tracking-widest">Registrar Activo</span>
          </span>
        </button>
      </div>

      @if (presenter.loading()) {
        <div class="flex flex-col justify-center items-center h-96 gap-4">
          <div class="animate-spin rounded-full h-12 w-12 border-2 border-slate-950/10 border-t-accent-gold"></div>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accediendo a la Bóveda...</p>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          @for (product of presenter.data(); track presenter.trackById($index, product)) {
            <app-product-card 
              [product]="product" 
              (action)="presenter.onViewDetail($event)"
              (edit)="presenter.onEdit($event)"
              class="h-full"
            />
          } @empty {
            @if (!presenter.error()) {
              <div class="col-span-full glass rounded-[3rem] border border-white/50 py-32 flex flex-col items-center justify-center text-center">
                 <div class="w-20 h-20 bg-slate-950/5 rounded-full flex items-center justify-center mb-6">
                     <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                 </div>
                  <h3 class="text-lg font-display font-black text-slate-950 mb-2">La Bóveda está Vacía</h3>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No se han registrado activos en esta colección.</p>
              </div>
            }
          }
        </div>
        
        @if (presenter.error()) {
          <div class="mt-12 p-8 glass rounded-[2rem] border border-red-500/10 text-center">
            <p class="text-[10px] font-black uppercase tracking-widest text-red-500">
              Alerta del Sistema: {{ presenter.error() }}
            </p>
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

