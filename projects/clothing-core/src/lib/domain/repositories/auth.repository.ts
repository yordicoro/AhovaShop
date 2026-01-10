import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

export interface LoginCredentials {
    email: string;
    token: string; // En una app real usaríamos password, aquí simulamos con token/auth
}

export abstract class AuthRepository {
    abstract login(credentials: LoginCredentials): Observable<User>;
    abstract logout(): Observable<void>;
    abstract getCurrentUser(): Observable<User | null>;
}
