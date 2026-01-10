import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, tap, withLatestFrom } from 'rxjs';
import { ProductActions } from './product.actions';
import { GetProductsUseCase } from '../../../application/use-cases/get-products.usecase';
import { ProductRepositoryImpl } from '../../repositories/product.repository.impl';
import { NotificationService } from '../../services/notification.service';
import { Store } from '@ngrx/store';
import { selectSearchTerm, selectSelectedCategory } from './product.reducer';

@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private getProductsUseCase = inject(GetProductsUseCase);

    private repo = inject(ProductRepositoryImpl);
    private notifications = inject(NotificationService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            withLatestFrom(
                this.store.select(selectSearchTerm),
                this.store.select(selectSelectedCategory)
            ),
            exhaustMap(([{ pagination }, searchTerm, category]) =>
                this.getProductsUseCase.execute(pagination, { searchTerm, category }).pipe(
                    map((result) => {
                        if (Array.isArray(result)) {
                            return ProductActions.loadProductsSuccess({ products: result });
                        } else {
                            return ProductActions.loadProductsSuccess({
                                products: result.data,
                                total: result.total,
                                page: result.page,
                                pageSize: result.pageSize
                            });
                        }
                    }),
                    catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message })))
                )
            )
        )
    );

    saveProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.saveProduct),
            exhaustMap(({ product }) =>
                this.repo.save(product).pipe(
                    tap(() => this.notifications.success('Operación realizada con éxito')),
                    map(() => ProductActions.saveProductSuccess({ product })),
                    catchError((error) => {
                        this.notifications.error('Error al guardar el producto');
                        return of(ProductActions.saveProductFailure({ error: error.message }));
                    })
                )
            )
        )
    );
}
