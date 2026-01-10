import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../../domain/entities/product.entity';
import { ProductActions } from './product.actions';

export interface ProductState extends EntityState<Product> {
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    selectedCategory: string | null;
    total: number;
    page: number;
    pageSize: number;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialProductState: ProductState = productAdapter.getInitialState({
    isLoading: false,
    error: null,
    searchTerm: '',
    selectedCategory: null,
    total: 0,
    page: 1,
    pageSize: 12,
});

export const productFeature = createFeature({
    name: 'product',
    reducer: createReducer(
        initialProductState,
        on(ProductActions.loadProducts, (state, { pagination }) => ({
            ...state,
            isLoading: true,
            error: null,
            page: pagination?.page ?? state.page,
            pageSize: pagination?.pageSize ?? state.pageSize
        })),
        on(ProductActions.loadProductsSuccess, (state, { products, total, page, pageSize }) =>
            productAdapter.setAll(products, {
                ...state,
                isLoading: false,
                total: total ?? products.length,
                page: page ?? state.page,
                pageSize: pageSize ?? state.pageSize
            })
        ),
        on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
        on(ProductActions.saveProductSuccess, (state, { product }) => productAdapter.upsertOne(product, state)),
        on(ProductActions.setSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
        on(ProductActions.setCategory, (state, { category }) => ({ ...state, selectedCategory: category })),
        on(ProductActions.clearFilters, (state) => ({ ...state, searchTerm: '', selectedCategory: null })),
    ),
});

export const {
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts,
} = productAdapter.getSelectors(productFeature.selectProductState);

export const {
    selectIsLoading: selectProductIsLoading,
    selectError: selectProductError,
    selectSearchTerm,
    selectSelectedCategory,
    selectTotal,
    selectPage,
    selectPageSize,
} = productFeature;

export const selectFilteredProducts = createSelector(
    selectAllProducts,
    selectSearchTerm,
    selectSelectedCategory,
    (products: Product[], searchTerm: string, category: string | null) => {
        return products.filter(product => {
            const matchesSearch = !searchTerm ||
                (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

            const matchesCategory = !category || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }
);
