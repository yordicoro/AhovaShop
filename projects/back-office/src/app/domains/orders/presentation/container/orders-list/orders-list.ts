import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderListPresenter } from '../../presenter/order-list.presenter';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  providers: [OrderListPresenter],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Gestión de Pedidos</h1>
          <p class="text-slate-500 mt-1">Monitorea y procesa las órdenes de tus clientes</p>
        </div>
      </div>
      
      @if (presenter.loading()) {
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      } @else if (presenter.error()) {
        <div class="bg-red-50 border-l-4 border-red-400 p-4">
          <p class="text-sm text-red-700">{{ presenter.error() }}</p>
        </div>
      } @else {
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">ID Pedido</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Cliente</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Fecha</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Total</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Estado</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (orderAggregate of presenter.data(); track orderAggregate?.order?.id || $index) {
                @if (orderAggregate?.order) {
                  <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td class="px-6 py-4 font-mono text-xs text-slate-600">
                      #{{ (orderAggregate.order.id || 'N/A').substring(0,8).toUpperCase() }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="font-semibold text-slate-900">
                        Cliente #{{ (orderAggregate.order.customerId || 'Anon').substring(0,5) }}
                      </div>
                      <div class="text-xs text-slate-500">
                        ID: {{ orderAggregate.order.customerId || 'No ID' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600">
                      {{ orderAggregate.order.createdAt | date:'dd/MM/yyyy' }}
                    </td>
                    <td class="px-6 py-4 font-bold text-slate-900">
                      {{ orderAggregate.order.totalAmount | currency }}
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" 
                            [ngClass]="{
                              'bg-green-100 text-green-700': orderAggregate.order.status === 'CONFIRMED' || orderAggregate.order.status === 'SHIPPED',
                              'bg-orange-100 text-orange-700': orderAggregate.order.status === 'PENDING'
                            }">
                        {{ orderAggregate.order.status || 'N/A' }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      @if (orderAggregate.order.status === 'PENDING') {
                        <button 
                          (click)="presenter.onOrderAction(orderAggregate)"
                          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                        >
                          Confirmar
                        </button>
                      } @else if (orderAggregate.order.status === 'CONFIRMED') {
                        <span class="text-xs font-semibold text-green-600 flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                          Procesado
                        </span>
                      }
                    </td>
                  </tr>
                }
              } @empty {
                <tr>
                  <td colspan="6" class="p-20 text-center">
                    <span class="text-4xl mb-4 block">📦</span>
                    <p class="text-slate-500 font-medium">No hay pedidos registrados</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `
})
export class OrdersListPage implements OnInit {
  protected presenter = inject(OrderListPresenter);

  ngOnInit() {
    this.presenter.loadOrders();
  }
}
