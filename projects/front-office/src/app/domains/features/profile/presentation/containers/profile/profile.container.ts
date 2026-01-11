import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfilePresenter } from '../../presenters/profile.presenter';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  providers: [ProfilePresenter],
  template: `
    <div class="bg-slate-50 min-h-screen pt-12 pb-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Premium Member Header -->
        <header class="mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
          <div class="space-y-3">
              <nav class="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span class="hover:text-slate-900 cursor-pointer">Miembro</span>
                  <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span class="text-slate-950">Perfil Privado</span>
              </nav>
              <h2 class="text-5xl font-display font-black text-slate-950 tracking-tighter">Panel de Miembro</h2>
              <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Acceso Exclusivo &bull; Nivel Platinum</p>
          </div>
          
          <div class="flex items-center gap-6">
              <button (click)="presenter.logout()" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors flex items-center gap-2 group">
                  <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Finalizar Sesión
              </button>
          </div>
        </header>

        @if (presenter.user$ | async; as user) {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- Identity Profile Card -->
            <div class="lg:col-span-1 space-y-8">
              <div class="glass rounded-[3rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden group">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 blur-3xl group-hover:bg-accent-gold/10 transition-all"></div>
                  
                  <div class="text-center mb-10">
                      <div class="inline-flex items-center justify-center w-24 h-24 bg-slate-950 rounded-[2rem] mb-6 rotate-3 shadow-2xl relative overflow-hidden group/avatar">
                          <div class="absolute inset-0 bg-accent-gold/20 blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                          @if (user.avatarUrl) {
                              <img [src]="user.avatarUrl" [alt]="user.name" class="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover/avatar:scale-110">
                          } @else {
                              <span class="text-accent-gold font-display font-black text-4xl relative z-10">{{ user.name.charAt(0).toUpperCase() }}</span>
                          }
                      </div>
                      <h3 class="text-2xl font-display font-black text-slate-950 capitalize tracking-tight">{{ user.name }}</h3>
                      <p class="text-[11px] font-bold text-slate-400 mt-1 italic">{{ user.email }}</p>
                  </div>

                  <div class="space-y-4">
                      <div class="p-5 bg-white/40 rounded-2xl border border-slate-100/50">
                          <p class="text-[9px] uppercase tracking-widest text-slate-400 font-black mb-1.5">Estatus de Miembro</p>
                          <span class="text-xs font-black text-slate-950 uppercase tracking-tighter flex items-center gap-2">
                             <span class="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
                             {{ user.role === presenter.UserRole.ADMIN ? 'Administrador Elite' : 'Cliente Distinguido' }}
                          </span>
                      </div>
                      <div class="p-5 bg-white/40 rounded-2xl border border-slate-100/50">
                          <p class="text-[9px] uppercase tracking-widest text-slate-400 font-black mb-1.5">ID de Referencia</p>
                          <span class="text-[10px] font-mono font-bold text-slate-500">AHV-{{ user.id.substring(0,8).toUpperCase() }}</span>
                      </div>
                  </div>
              </div>

              <!-- Quick Link Bóveda -->
              <div class="glass-dark rounded-[2.5rem] p-10 border border-white/10 shadow-2xl text-white">
                  <h4 class="text-[11px] font-black uppercase tracking-[0.3em] text-accent-gold mb-8">Mi Bóveda</h4>
                  <div class="space-y-6">
                      <div class="flex items-center justify-between group cursor-pointer">
                          <div class="flex items-center gap-4">
                              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-gold/50 transition-all">
                                  <svg class="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                              </div>
                              <span class="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">Deseados</span>
                          </div>
                          <span class="text-[10px] font-black text-slate-500">0 Artículos</span>
                      </div>
                      <div class="flex items-center justify-between group cursor-pointer" routerLink="/shop">
                          <div class="flex items-center gap-4">
                              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-gold/50 transition-all">
                                  <svg class="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                              </div>
                              <span class="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">Colecciones</span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            <!-- Adquisitions Tracking -->
            <div class="lg:col-span-2 space-y-8">
              <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                      <div class="w-8 h-px bg-slate-900"></div>
                      <h3 class="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Historial de Adquisiciones</h3>
                  </div>
                  <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                      Últimas 24 Meses
                  </span>
              </div>

              @if (presenter.loading()) {
                  <div class="grid grid-cols-1 gap-6 animate-pulse">
                      @for (i of [1,2,3]; track i) {
                          <div class="h-32 glass rounded-3xl border border-white/40"></div>
                      }
                  </div>
              } @else if (presenter.error()) {
                  <div class="p-10 glass rounded-[2rem] border border-red-100 text-center">
                      <p class="text-red-500 text-[11px] font-bold uppercase tracking-widest">{{ presenter.error() }}</p>
                  </div>
              } @else {
                  <div class="space-y-6">
                      @for (aggregate of presenter.orders(); track aggregate.order.id) {
                          <div class="group relative glass rounded-[2rem] p-8 border border-white/40 shadow-xl hover:bg-white/60 transition-all duration-500 cursor-pointer overflow-hidden">
                              <!-- Order Decoration -->
                              <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-950/[0.02] -rotate-12 transform group-hover:scale-110 transition-transform">
                                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                              </div>

                              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                                  <div class="flex gap-6 items-center">
                                      <div class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-3 transition-transform">
                                          <svg class="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                      </div>
                                      <div>
                                          <div class="flex items-center gap-3 mb-1.5">
                                              <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">PRD-{{ aggregate.order.id.substring(0,8).toUpperCase() }}</span>
                                              <span class="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border"
                                                    [ngClass]="{
                                                      'bg-emerald-50 text-emerald-600 border-emerald-100': aggregate.order.status === 'CONFIRMED',
                                                      'bg-amber-50 text-amber-600 border-amber-100': aggregate.order.status === 'PENDING'
                                                    }">
                                                {{ aggregate.order.status === 'CONFIRMED' ? 'Confirmado' : 'Procesando' }}
                                              </span>
                                          </div>
                                          <h4 class="text-lg font-display font-black text-slate-950 tracking-tight">
                                              {{ aggregate.items.length }} {{ aggregate.items.length === 1 ? 'Artículo' : 'Artículos' }} Curados
                                          </h4>
                                          <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                              Adquirido el {{ aggregate.order.createdAt | date:'longDate' }}
                                          </p>
                                      </div>
                                  </div>
                                  
                                  <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                      <p class="text-2xl font-display font-black text-slate-950 tracking-tighter">{{ aggregate.order.totalAmount | currency }}</p>
                                      <button class="text-[10px] font-black text-accent-gold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                                          Detalles <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      } @empty {
                          <div class="text-center py-40 glass rounded-[3rem] border border-dashed border-slate-300">
                              <p class="text-slate-400 text-sm font-display italic mb-8">Su galería de adquisiciones está vacía.</p>
                              <button routerLink="/shop" class="btn-primary">
                                  Iniciar Colección
                              </button>
                          </div>
                      }
                  </div>
              }
            </div>
          </div>
        } @else {
          <!-- Non-authenticated state -->
          <div class="flex flex-col items-center justify-center py-60 glass rounded-[4rem] border border-white/40 shadow-2xl">
              <h3 class="text-3xl font-display font-black text-slate-950 mb-3 tracking-tight">Acceso Restringido</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">Inicie sesión para acceder a su panel exclusivo</p>
              <button routerLink="/login" class="btn-gold px-12 py-5 shadow-2xl shadow-accent-gold/40">
                  Establecer Conexión
              </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent {
  protected presenter = inject(ProfilePresenter);
}
