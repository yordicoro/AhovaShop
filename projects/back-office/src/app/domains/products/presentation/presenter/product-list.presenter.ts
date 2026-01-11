import { Injectable, effect } from '@angular/core';
import { Product } from 'clothing-core';
import { GetProductsUseCase } from '../../application/use-cases/get-products.usecase';
import { BasePresenterWithSignals } from '../../../../shared/presenters/base/base-signals.presenter';

import { Router } from '@angular/router';

@Injectable()
export class ProductListPresenter extends BasePresenterWithSignals<Product[]> {

    constructor(
        private getProductsUseCase: GetProductsUseCase,
        private router: Router
    ) {
        super();
        // Ejemplo de efecto para debuggear cambios en el estado
        effect(() => {
            this.log('Products State Updated', {
                count: this.data()?.length || 0,
                loading: this.loading()
            });
        }, { allowSignalWrites: true });
    }

    loadProducts(): void {
        this.setLoading(true);
        this.getProductsUseCase.execute().subscribe({
            next: (response) => {
                const products = Array.isArray(response) ? response : response.data;
                this.setData(products);
            },
            error: (error) => {
                this.setError('Error al cargar los productos. Inténtalo de nuevo más tarde.');
                console.error(error);
            }
        });
    }

    onViewDetail(product: Product): void {
        this.log('Navigating to detail', product.id);
        this.router.navigate(['/inventory', product.id]);
    }

    onEdit(product: Product): void {
        this.log('Navigating to edit', product.id);
        this.router.navigate(['/inventory/edit', product.id]);
    }
}
