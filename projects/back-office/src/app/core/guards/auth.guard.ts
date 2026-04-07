import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthPresenter } from '../../shared/presenters/base/base-auth.presenter';

export const authGuard: CanActivateFn = (route, state) => {
    const authPresenter = inject(AuthPresenter);
    const router = inject(Router);

    if (authPresenter.isAuthenticated() && authPresenter.isAdmin()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};
