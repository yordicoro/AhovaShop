import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPresenter } from '../../../presenter/dashboard.presenter';

@Component({
  selector: 'main-page-container',
  standalone: true,
  imports: [CommonModule],
  providers: [DashboardPresenter],
  template: `
    <div class="px-8 py-12 bg-slate-50 min-h-screen">
      <header class="mb-12 flex items-end justify-between">
        <div class="space-y-1">
            <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Oficina de Inteligencia</h2>
            <h1 class="text-4xl font-display font-black text-slate-950 tracking-tight">Panel Ejecutivo</h1>
        </div>
        <div class="hidden md:block">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                Estado del Sistema: <span class="text-emerald-500">Óptimo</span>
            </p>
        </div>
      </header>

      @if (presenter.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          @for (i of [1,2,3,4]; track i) {
            <div class="h-40 glass rounded-[2.5rem] border border-white/50 shadow-xl"></div>
          }
        </div>
      } @else if (presenter.data(); as stats) {
        <!-- Stats Grid (Luxury Glass) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <!-- Total Revenue -->
          <div class="glass p-8 rounded-[2.5rem] border border-white/50 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div class="relative z-10">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Ingresos Brutos</p>
              <h3 class="text-3xl font-display font-black text-slate-950">{{ stats.totalRevenue | currency:'USD' }}</h3>
              <div class="mt-4 flex items-center gap-2">
                <span class="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">+12.4% de rendimiento</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-950/5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>

          <!-- Total Orders -->
          <div class="glass p-8 rounded-[2.5rem] border border-white/50 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div class="relative z-10">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Volumen de Adquisición</p>
              <h3 class="text-3xl font-display font-black text-slate-950">{{ stats.totalOrders }}</h3>
              <div class="mt-4">
                <span class="text-[9px] font-bold text-slate-400 bg-slate-950/5 px-3 py-1 rounded-full uppercase tracking-tighter">Actividad de Sesiones en Vivo</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-950/5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
          </div>

          <!-- Total Inventory -->
          <div class="glass p-8 rounded-[2.5rem] border border-white/50 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div class="relative z-10">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Registro de Activos</p>
              <h3 class="text-3xl font-display font-black text-slate-950">{{ stats.totalProducts }}</h3>
              <div class="mt-4">
                <span class="text-[9px] font-bold text-slate-400 bg-slate-950/5 px-3 py-1 rounded-full uppercase tracking-tighter">SKUs de Inventario Global</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-950/5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
          </div>

          <!-- Low Stock -->
          <div class="glass-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div class="relative z-10 text-white">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Escasez Crítica</p>
              <h3 class="text-3xl font-display font-black text-accent-gold">{{ stats.lowStockItems }}</h3>
              <div class="mt-4">
                <span class="text-[9px] font-bold text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full uppercase tracking-tighter">Acción Requerida</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-accent-gold/5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>

        </div>

        <!-- Recent Activity Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 glass p-10 rounded-[3rem] border border-white/40 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-8 h-px bg-slate-900"></div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950">Historial de Adquisiciones</h4>
            </div>
            <div class="space-y-6">
              <div class="p-6 bg-white/40 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white/60 transition-all">
                  <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center">
                          <svg class="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                      </div>
                      <div>
                          <p class="text-[11px] font-bold text-slate-950">Pedido Colección Invierno a Medida</p>
                          <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Pedido #88392 &bull; hace 2 min</p>
                      </div>
                  </div>
                  <span class="text-xs font-black text-slate-950">$1,240.00</span>
              </div>
              <p class="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest pt-4">Motor de Análisis Activo &bull; Feed en Tiempo Real</p>
            </div>
          </div>

          <div class="glass-dark p-10 rounded-[3rem] border border-white/10 shadow-2xl text-white">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-6 h-px bg-accent-gold"></div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold">Rendimiento de Élite</h4>
            </div>
            <div class="space-y-8">
                <div class="text-center py-10">
                    <div class="inline-block relative mb-6">
                        <svg class="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="44" stroke="currentColor" stroke-width="4" fill="transparent" class="text-white/5"></circle>
                            <circle cx="48" cy="48" r="44" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="276" stroke-dashoffset="60" class="text-accent-gold"></circle>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-xl font-display font-black text-white">78%</span>
                        </div>
                    </div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Eficiencia de Inventario</p>
                    <p class="text-sm font-display font-medium text-white/80">Utilización de stock en niveles máximos de rendimiento.</p>
                </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class MainPageContainer {
  protected presenter = inject(DashboardPresenter);
}
