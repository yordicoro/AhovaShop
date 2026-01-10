import { createFeature, createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../domain/entities/cart-item.entity';
import { CartActions } from './cart.actions';

export interface CartState {
    items: CartItem[];
}

export const initialCartState: CartState = {
    items: []
};

export const cartFeature = createFeature({
    name: 'cart',
    reducer: createReducer(
        initialCartState,
        on(CartActions.addItem, (state, { item }) => {
            const existingItem = state.items.find(i => i.productId === item.productId);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.productId === item.productId
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                };
            }
            return { ...state, items: [...state.items, item] };
        }),
        on(CartActions.removeItem, (state, { productId }) => ({
            ...state,
            items: state.items.filter(i => i.productId !== productId)
        })),
        on(CartActions.clearCart, (state) => ({ ...state, items: [] })),
    ),
});

export const {
    selectItems,
} = cartFeature;
