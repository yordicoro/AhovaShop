import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, LoginCredentials, AuthRepository as CoreAuthRepository } from 'clothing-core';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
    providedIn: 'root'
})
export class AuthRepositoryImpl implements AuthRepository {
    private coreRepo = inject(CoreAuthRepository);

    login(credentials: LoginCredentials): Observable<User> {
        return this.coreRepo.login(credentials);
    }

    logout(): Observable<void> {
        return this.coreRepo.logout();
    }

    getCurrentUser(): Observable<User | null> {
        return this.coreRepo.getCurrentUser();
    }
}
