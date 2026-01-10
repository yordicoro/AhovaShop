import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'shop',
        loadComponent: () => import('./features/shop/presentation/containers/shop/shop.container').then(m => m.ShopContainerComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/presentation/containers/cart/cart.container').then(m => m.CartPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/presentation/containers/login/login.container').then(m => m.LoginComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/presentation/containers/profile/profile.container').then(m => m.ProfileComponent)
    },
    {
        path: '',
        loadComponent: () => import('./features/home/presentation/containers/home/home.container').then(m => m.HomeComponent)
    }
];
