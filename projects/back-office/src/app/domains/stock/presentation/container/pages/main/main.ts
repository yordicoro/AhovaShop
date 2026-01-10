import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPresenter } from '../../../presenter/dashboard.presenter';

@Component({
  selector: 'main-page-container',
  standalone: true,
  imports: [CommonModule],
  providers: [DashboardPresenter],
  template: `
    <div class="p-6">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p class="text-slate-500 mt-1">Resumen general de tu tienda y operaciones</p>
      </header>

      @if (presenter.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          @for (i of [1,2,3,4]; track i) {
            <div class="h-32 bg-slate-100 rounded-2xl"></div>
          }
        </div>
      } @else if (presenter.data(); as stats) {
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <!-- Total Revenue -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ingresos Totales</p>
              <h3 class="text-2xl font-black text-slate-900">{{ stats.totalRevenue | currency:'USD' }}</h3>
              <div class="mt-2 flex items-center text-emerald-600 text-xs font-bold">
                <span class="bg-emerald-50 px-2 py-0.5 rounded-full">+12% vs mes anterior</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <!-- Total Orders -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pedidos Totales</p>
              <h3 class="text-2xl font-black text-slate-900">{{ stats.totalOrders }}</h3>
              <div class="mt-2 flex items-center text-slate-500 text-xs font-bold">
                <span class="bg-slate-50 px-2 py-0.5 rounded-full">Procesados hoy</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>

          <!-- Total Inventory -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Productos en Stock</p>
              <h3 class="text-2xl font-black text-slate-900">{{ stats.totalProducts }}</h3>
              <div class="mt-2 flex items-center text-slate-500 text-xs font-bold">
                <span class="bg-slate-50 px-2 py-0.5 rounded-full">SKUs Activos</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>

          <!-- Low Stock -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stock Bajo</p>
              <h3 class="text-2xl font-black text-amber-600">{{ stats.lowStockItems }}</h3>
              <div class="mt-2 flex items-center text-amber-600 text-xs font-bold">
                <span class="bg-amber-50 px-2 py-0.5 rounded-full">Requiere Atención</span>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

        </div>

        <!-- Recent Activity Placeholder -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 class="text-lg font-bold text-slate-900 mb-6">Pedidos Recientes</h4>
            <div class="space-y-4">
              <p class="text-slate-400 text-sm italic">Próximamente: Integración con historial detallado</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 class="text-lg font-bold text-slate-900 mb-6">Productos más vendidos</h4>
            <div class="space-y-4">
               <p class="text-slate-400 text-sm italic">Próximamente: Gráficos de analytics</p>
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
