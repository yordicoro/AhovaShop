import { Routes } from "@angular/router";
import { ProductsListPage } from "../container/products-list/products-list";

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        component: ProductsListPage
    }
];

export default PRODUCT_ROUTES;
