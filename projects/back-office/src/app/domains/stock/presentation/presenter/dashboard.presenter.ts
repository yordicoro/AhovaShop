import { Injectable, inject, computed } from '@angular/core';
import { GetProductsUseCase, GetAllOrdersUseCase, Product, OrderAggregate } from 'clothing-core';
import { BasePresenterWithSignals } from '../../../../core/presentation/base/base-signals.presenter';
import { forkJoin } from 'rxjs';

export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockItems: number;
}

@Injectable()
export class DashboardPresenter extends BasePresenterWithSignals<DashboardStats> {
    private getProductsUseCase = inject(GetProductsUseCase);
    private getAllOrdersUseCase = inject(GetAllOrdersUseCase);

    public constructor() {
        super();
        this.loadDashboardData();
    }

    public loadDashboardData(): void {
        this.setLoading(true);
        forkJoin({
            products: this.getProductsUseCase.execute(),
            orders: this.getAllOrdersUseCase.execute()
        }).subscribe({
            next: ({ products: productsResponse, orders }) => {
                const products: Product[] = Array.isArray(productsResponse) ? productsResponse : productsResponse.data;
                const stats: DashboardStats = {
                    totalProducts: Array.isArray(productsResponse) ? productsResponse.length : productsResponse.total,
                    totalOrders: orders.length,
                    totalRevenue: orders.reduce((acc, curr) => acc + curr.order.totalAmount, 0),
                    lowStockItems: products.filter(p => p.stock < 10).length
                };
                this.setData(stats);
            },
            error: (err) => {
                this.setError('Error al cargar datos del dashboard');
                console.error(err);
            }
        });
    }
}
