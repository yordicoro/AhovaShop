import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../../domain/entities/cart-item.entity';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'Add Item': props<{ item: CartItem }>(),
        'Remove Item': props<{ productId: string }>(),
        'Clear Cart': emptyProps(),
    }
});
