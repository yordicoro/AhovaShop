import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUser, AuthActions, GetOrdersByCustomerUseCase, User } from 'clothing-core';
import { RouterLink } from '@angular/router';
import { ProfilePresenter } from '../../presenters/profile.presenter';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  providers: [ProfilePresenter],
  template: `
    <div class="max-w-4xl mx-auto py-12 px-4">
      <div class="bg-white border border-slate-200 shadow-sm overflow-hidden">
        <!-- Header Decor -->
        <div class="h-32 bg-slate-900 relative">
           <div class="absolute -bottom-12 left-8 w-24 h-24 bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white">
             {{ (user$ | async)?.name?.charAt(0)?.toUpperCase() }}
            </div>
        </div>

        <div class="pt-16 pb-12 px-8">
          @if (user$ | async; as user) {
            <div class="flex flex-col md:flex-row justify-between items-start gap-8">
              <div class="flex-grow">
                <h2 class="text-3xl font-display font-bold text-slate-900 capitalize">{{ user.name }}</h2>
                <p class="text-slate-500 font-medium italic mt-1">{{ user.email }}</p>
                
                <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div class="p-4 bg-slate-50 border border-slate-100">
                      <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Rol de Usuario</p>
                      <p class="text-sm font-bold text-slate-700">{{ user.role }}</p>
                   </div>
                   <div class="p-4 bg-slate-50 border border-slate-100">
                      <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">ID Cliente</p>
                      <p class="text-xs font-mono text-slate-500">#{{ user.id }}</p>
                   </div>
                </div>

                <div class="mt-10 flex gap-4">
                   <button (click)="logout()" class="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                     Cerrar Sesión
                   </button>
                   <a routerLink="/shop" class="px-6 py-3 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                     Volver a la Tienda
                   </a>
                </div>
              </div>

              <div class="w-full md:w-64 space-y-4">
                 <div class="p-6 border border-slate-100 bg-slate-50/50">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">Mi Actividad</h4>
                    <ul class="space-y-3">
                       <li class="flex items-center gap-3 text-xs text-slate-600 hover:text-primary cursor-pointer transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                          Mis Compras
                       </li>
                       <li class="flex items-center gap-3 text-xs text-slate-600 hover:text-primary cursor-pointer transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          Lista de Deseos
                       </li>
                    </ul>
                 </div>
              </div>
            </div>

            <!-- Orders Section -->
            <div class="mt-16 border-t border-slate-200 pt-12">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-2xl font-display font-bold text-slate-900">Mis Compras</h3>
                <span class="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                  {{ presenter.orders().length }} Pedidos
                </span>
              </div>

              @if (presenter.loading()) {
                <div class="flex justify-center py-12">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                </div>
              } @else if (presenter.error()) {
                <div class="p-4 bg-red-50 text-red-600 text-sm font-medium border-l-4 border-red-500">
                  {{ presenter.error() }}
                </div>
              } @else {
                <div class="grid grid-cols-1 gap-4">
                  @for (aggregate of presenter.orders(); track aggregate.order.id) {
                    <div class="group bg-slate-50 border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white hover:shadow-md transition-all">
                      <div>
                        <div class="flex items-center gap-3 mb-2">
                           <span class="text-xs font-mono text-slate-400">#{{ aggregate.order.id.substring(0,8).toUpperCase() }}</span>
                           <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter"
                                 [ngClass]="{
                                   'bg-green-100 text-green-700': aggregate.order.status === 'CONFIRMED',
                                   'bg-orange-100 text-orange-700': aggregate.order.status === 'PENDING'
                                 }">
                             {{ aggregate.order.status }}
                           </span>
                        </div>
                        <p class="text-sm font-bold text-slate-900 mb-1">
                          {{ aggregate.items.length }} {{ aggregate.items.length === 1 ? 'Producto' : 'Productos' }}
                        </p>
                        <p class="text-xs text-slate-500">{{ aggregate.order.createdAt | date:'longDate' }}</p>
                      </div>
                      <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-1">
                        <p class="text-lg font-display font-bold text-slate-900">{{ aggregate.order.totalAmount | currency }}</p>
                        <button class="text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  } @empty {
                    <div class="text-center py-16 bg-slate-50 border border-dashed border-slate-200">
                      <p class="text-slate-400 text-sm italic">Aún no has realizado ninguna compra.</p>
                      <a routerLink="/shop" class="mt-4 inline-block text-xs font-bold text-primary uppercase tracking-widest border-b border-primary pb-1">
                        Empezar a comprar
                      </a>
                    </div>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="text-center py-20">
               <p class="text-slate-400 font-medium mb-6">Inicia sesión para ver tu perfil.</p>
               <a routerLink="/login" class="px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                 Iniciar Sesión
               </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent {
  private store = inject(Store);
  protected presenter = inject(ProfilePresenter);
  user$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor() {
    this.user$.subscribe(user => {
      if (user) {
        this.presenter.loadOrders(user.id);
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
