import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthRepository, LoginCredentials } from '../../domain/repositories/auth.repository';
import { User, UserRole } from '../../domain/entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthRepository {
    private readonly STORAGE_KEY = 'auth_user';
    private currentUser: User | null = null;

    private mockUsers: User[] = [
        new User('1', 'admin@ahovashop.com', 'Admin Ahova', UserRole.ADMIN, 'https://ui-avatars.com/api/?name=Admin+Ahova&background=0D8ABC&color=fff'),
        new User('2', 'yordi@ahovashop.com', 'Yordi Cliente', UserRole.CUSTOMER, 'https://ui-avatars.com/api/?name=Yordi+Cliente&background=random')
    ];

    login(credentials: LoginCredentials): Observable<User> {
        const user = this.mockUsers.find(u => u.email === credentials.email);

        if (user) {
            this.currentUser = user;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return of(user).pipe(delay(500));
        }

        return throwError(() => new Error('Credenciales inválidas'));
    }

    logout(): Observable<void> {
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEY);
        return of(undefined);
    }

    getCurrentUser(): Observable<User | null> {
        if (!this.currentUser) {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                this.currentUser = new User(data.id, data.email, data.name, data.role as UserRole, data.avatarUrl);
            }
        }
        return of(this.currentUser);
    }
}
