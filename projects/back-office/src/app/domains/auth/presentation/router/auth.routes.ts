import { Routes } from "@angular/router";
import { AuthLayout } from "../container/auth-layout/auth-layout";
import { LoginPage } from "../container/login/login";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                component: LoginPage
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];

export default AUTH_ROUTES;
