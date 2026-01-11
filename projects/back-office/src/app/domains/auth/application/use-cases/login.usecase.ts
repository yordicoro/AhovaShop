import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, LoginCredentials } from 'clothing-core';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase {
    private repository = inject(AuthRepository);

    execute(credentials: LoginCredentials): Observable<User> {
        return this.repository.login(credentials);
    }
}
