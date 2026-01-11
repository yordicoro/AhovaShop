import { Routes } from "@angular/router";
import { ProductsLayout } from "../container/products-layout/products-layout";
import { ProductsListPage } from "../container/products-list/products-list";
import { ProductFormPage } from "../container/product-form/product-form";
import { ProductDetailsPage } from "../container/product-details/product-details";

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        component: ProductsLayout,
        children: [
            {
                path: '',
                component: ProductsListPage
            },
            {
                path: 'new',
                component: ProductFormPage
            },
            {
                path: 'edit/:id',
                component: ProductFormPage
            },
            {
                path: ':id',
                component: ProductDetailsPage
            }
        ]
    }
];

export default PRODUCT_ROUTES;
