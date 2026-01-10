import { Routes } from '@angular/router';
import { LoginPage } from './domains/auth/presentation/container/login/login';
import { authGuard } from './core/guards/auth.guard';

export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/stock/presentation/router/stock.routes')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];