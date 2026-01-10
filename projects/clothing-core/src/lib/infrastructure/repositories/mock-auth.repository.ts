import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthRepository, LoginCredentials } from '../../domain/repositories/auth.repository';
import { User, UserRole } from '../../domain/entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class MockAuthRepository implements AuthRepository {
    private currentUser: User | null = null;

    // Simulamos usuarios predefinidos
    private mockUsers: User[] = [
        new User('1', 'admin@ahovashop.com', 'Admin Ahova', UserRole.ADMIN, 'https://ui-avatars.com/api/?name=Admin+Ahova&background=0D8ABC&color=fff'),
        new User('2', 'cliente@gmail.com', 'Yordi Cliente', UserRole.CUSTOMER, 'https://ui-avatars.com/api/?name=Yordi+Cliente&background=random')
    ];

    login(credentials: LoginCredentials): Observable<User> {
        const user = this.mockUsers.find(u => u.email === credentials.email);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('auth_user', JSON.stringify(user));
            return of(user);
        }

        throw new Error('Credenciales inválidas');
    }

    logout(): Observable<void> {
        this.currentUser = null;
        localStorage.removeItem('auth_user');
        return of(undefined);
    }

    getCurrentUser(): Observable<User | null> {
        if (!this.currentUser) {
            const saved = localStorage.getItem('auth_user');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentUser = new User(data.id, data.email, data.name, data.role as UserRole, data.avatarUrl);
            }
        }
        return of(this.currentUser);
    }
}
