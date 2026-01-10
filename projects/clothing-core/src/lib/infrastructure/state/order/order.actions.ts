import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderAggregate } from '../../../domain/aggregates/order.aggregate';

export const OrderActions = createActionGroup({
    source: 'Order',
    events: {
        'Load Orders': emptyProps(),
        'Load Orders Success': props<{ orders: OrderAggregate[] }>(),
        'Load Orders Failure': props<{ error: string }>(),
        'Create Order': props<{ order: OrderAggregate }>(),
        'Create Order Success': props<{ order: OrderAggregate }>(),
        'Create Order Failure': props<{ error: string }>(),
    }
});
