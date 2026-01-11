import { Injectable, inject } from '@angular/core';
import { Product } from 'clothing-core';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.usecase';
import { BasePresenterWithSignals } from '../../../../shared/presenters/base/base-signals.presenter';

@Injectable()
export class ProductDetailsPresenter extends BasePresenterWithSignals<Product> {
    private getProductByIdUseCase = inject(GetProductByIdUseCase);

    loadProduct(id: string): void {
        this.setLoading(true);
        this.getProductByIdUseCase.execute(id).subscribe({
            next: (product) => {
                if (product) {
                    this.setData(product);
                } else {
                    this.setError('El producto no existe.');
                }
            },
            error: (error) => {
                this.setError('Error al cargar el detalle del producto.');
                console.error(error);
            }
        });
    }

    onBack(): void {
        // Lógica para volver atrás (se puede inyectar Router si es necesario)
        this.log('Navigating back');
    }
}
