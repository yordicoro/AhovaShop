import { Routes } from "@angular/router";
import { MainPageContainer } from "../container/pages/main/main";
import { CategoryPageContainer } from "../container/pages/category/category";
import { StockLayout } from "../container/stock-layout/stock-layout";
import { ProductsListPage } from "../../../products/presentation/container/products-list/products-list";
import { ProductDetailsPage } from "../../../products/presentation/container/product-details/product-details";
import { ProductFormPage } from "../../../products/presentation/container/product-form/product-form";
import { OrdersListPage } from "../../../orders/presentation/container/orders-list/orders-list";

export const STOCK_ROUTES: Routes = [
    {
        path: '',
        component: StockLayout,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: MainPageContainer
            },
            {
                path: 'inventory',
                component: ProductsListPage
            },
            {
                path: 'inventory/new',
                component: ProductFormPage
            },
            {
                path: 'inventory/edit/:id',
                component: ProductFormPage
            },
            {
                path: 'inventory/:id',
                component: ProductDetailsPage
            },
            {
                path: 'orders',
                component: OrdersListPage
            },
            {
                path: 'accessory/:accesory',
                component: CategoryPageContainer
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    },
];

export default STOCK_ROUTES;