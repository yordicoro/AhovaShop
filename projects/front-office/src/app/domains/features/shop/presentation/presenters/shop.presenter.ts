import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    selectFilteredProducts,
    selectProductIsLoading,
    ProductActions,
    Product,
    CartActions,
    selectSelectedCategory,
    selectTotal,
    selectPage,
    selectPageSize
} from 'clothing-core';

@Injectable()
export class ShopPresenter {
    private store = inject(Store);
    Math = Math;

    // Selectors
    products$ = this.store.select(selectFilteredProducts);
    isLoading$ = this.store.select(selectProductIsLoading);
    selectedCategory$ = this.store.select(selectSelectedCategory);
    total$ = this.store.select(selectTotal);
    page$ = this.store.select(selectPage);
    pageSize$ = this.store.select(selectPageSize);

    // Static Categories (Could also come from a UseCase/Service)
    categories = [
        { id: 'all', label: 'Todo', value: null },
        { id: 'electronics', label: 'Electrónica', value: 'electronics' },
        { id: 'men', label: 'Ropa Hombre', value: "men's clothing" },
        { id: 'women', label: 'Ropa Mujer', value: "women's clothing" },
        { id: 'jewelry', label: 'Joyería', value: 'jewelery' },
    ];

    initialize() {
        this.store.dispatch(ProductActions.loadProducts({
            pagination: { page: 1, pageSize: 12 }
        }));
    }

    changePage(page: number) {
        this.store.dispatch(ProductActions.loadProducts({
            pagination: { page, pageSize: 12 }
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCategory(category: string | null) {
        // Dispatching setCategory will trigger handleFilters$ effect in clothing-core
        this.store.dispatch(ProductActions.setCategory({ category }));
    }

    addToCart(product: Product) {
        this.store.dispatch(CartActions.addItem({
            item: {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl
            }
        }));
    }
}
