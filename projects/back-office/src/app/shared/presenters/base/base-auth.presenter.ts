import { Injectable, signal, inject, computed } from '@angular/core';
import { User, UserRole } from 'clothing-core';
import { BasePresenter } from './base.presenter';
import { Router } from '@angular/router';
import { GetCurrentUserUseCase } from '../../../domains/auth/application/use-cases/get-current-user.usecase';

@Injectable({
    providedIn: 'root'
})
export class AuthPresenter extends BasePresenter {
    private getCurrentUserUseCase = inject(GetCurrentUserUseCase);
    private router = inject(Router);

    // State
    private _user = signal<User | null>(null);

    // Selectors
    public readonly user = computed(() => this._user());
    public readonly isAuthenticated = computed(() => !!this._user());
    public readonly isAdmin = computed(() => this._user()?.role === UserRole.ADMIN);

    constructor() {
        super();
        this.initializeSession();
    }

    private initializeSession(): void {
        this.getCurrentUserUseCase.execute().subscribe(user => {
            this._user.set(user);
        });
    }

    public setUser(user: User | null): void {
        this._user.set(user);
    }

    public logout(): void {
        // Para simplificar lo hacemos directo aquí
        localStorage.removeItem('auth_user');
        this._user.set(null);
        this.router.navigate(['/login']);
    }
}
