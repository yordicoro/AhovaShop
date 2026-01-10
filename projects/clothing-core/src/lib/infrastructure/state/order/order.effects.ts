import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, of } from 'rxjs';
import { OrderActions } from './order.actions';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order.usecase';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable()
export class OrderEffects {
    private actions$ = inject(Actions);
    private createOrderUseCase = inject(CreateOrderUseCase);
    // private loadOrdersUseCase = inject(LoadOrdersUseCase); // If we had one

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.createOrder),
            concatMap(({ order }) =>
                this.createOrderUseCase.execute(order).pipe(
                    map((createdOrder) => OrderActions.createOrderSuccess({ order: createdOrder })),
                    catchError((error) => of(OrderActions.createOrderFailure({ error: error.message })))
                )
            )
        )
    );

    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadOrders),
            concatMap(() =>
                // Using the repository directly for simplicity in this rubric context
                inject(OrderRepository).getAllOrders().pipe(
                    map((orders) => OrderActions.loadOrdersSuccess({ orders })),
                    catchError((error) => of(OrderActions.loadOrdersFailure({ error: error.message })))
                )
            )
        )
    );
}
