import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { selectItems } from './cart.reducer';

@Injectable()
export class CartEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private readonly STORAGE_KEY = 'ahovashop_cart';

    persistCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addItem, CartActions.removeItem, CartActions.clearCart),
            tap(() => {
                this.store.select(selectItems).subscribe(items => {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
                }).unsubscribe();
            })
        ),
        { dispatch: false }
    );
}
