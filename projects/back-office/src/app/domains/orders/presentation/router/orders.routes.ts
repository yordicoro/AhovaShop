import { Routes } from "@angular/router";
import { OrdersLayout } from "../container/orders-layout/orders-layout";
import { OrdersListPage } from "../container/orders-list/orders-list";

export const ORDER_ROUTES: Routes = [
    {
        path: '',
        component: OrdersLayout,
        children: [
            {
                path: '',
                component: OrdersListPage
            }
        ]
    }
];

export default ORDER_ROUTES;
