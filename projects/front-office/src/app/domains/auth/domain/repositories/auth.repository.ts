import { Observable } from 'rxjs';
import { User, LoginCredentials } from 'clothing-core';

export abstract class AuthRepository {
    abstract login(credentials: LoginCredentials): Observable<User>;
    abstract logout(): Observable<void>;
    abstract getCurrentUser(): Observable<User | null>;
}
