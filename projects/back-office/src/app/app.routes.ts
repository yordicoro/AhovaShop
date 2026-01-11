import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const ROUTES: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./domains/auth/presentation/router/auth.routes')
    },
    {
        path: 'inventory',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/products/presentation/router/products.routes')
    },
    {
        path: 'orders',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/orders/presentation/router/orders.routes')
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/stock/presentation/router/stock.routes')
    },
    {
        path: 'login',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];