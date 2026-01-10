import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrderAggregate } from '../../../domain/aggregates/order.aggregate';
import { OrderActions } from './order.actions';

export interface OrderState extends EntityState<OrderAggregate> {
    // additional entities state properties
    isLoading: boolean;
    error: string | null;
}

export const orderAdapter: EntityAdapter<OrderAggregate> = createEntityAdapter<OrderAggregate>({
    selectId: (order: OrderAggregate) => order.order.id
});

export const initialOrderState: OrderState = orderAdapter.getInitialState({
    // additional entity state properties
    isLoading: false,
    error: null,
});

export const orderFeature = createFeature({
    name: 'order',
    reducer: createReducer(
        initialOrderState,
        on(OrderActions.loadOrders, (state) => ({ ...state, isLoading: true, error: null })),
        on(OrderActions.loadOrdersSuccess, (state, { orders }) => orderAdapter.setAll(orders, { ...state, isLoading: false })),
        on(OrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

        on(OrderActions.createOrder, (state) => ({ ...state, isLoading: true, error: null })),
        on(OrderActions.createOrderSuccess, (state, { order }) => orderAdapter.addOne(order, { ...state, isLoading: false })),
        on(OrderActions.createOrderFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
    ),
});

export const {
    selectIds: selectOrderIds,
    selectEntities: selectOrderEntities,
    selectAll: selectAllOrders,
    selectTotal: selectTotalOrders,
} = orderAdapter.getSelectors(orderFeature.selectOrderState);

export const {
    selectIsLoading: selectOrderIsLoading,
    selectError: selectOrderError,
} = orderFeature;
