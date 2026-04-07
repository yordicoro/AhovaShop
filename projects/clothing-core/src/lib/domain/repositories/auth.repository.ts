import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

export interface LoginCredentials {
    email: string;
    token: string;
}

export abstract class AuthRepository {
    abstract login(credentials: LoginCredentials): Observable<User>;
    abstract logout(): Observable<void>;
    abstract getCurrentUser(): Observable<User | null>;
}
