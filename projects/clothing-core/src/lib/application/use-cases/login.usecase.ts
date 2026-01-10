import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository, LoginCredentials } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase {
    constructor(private readonly authRepository: AuthRepository) { }

    execute(credentials: LoginCredentials): Observable<User> {
        return this.authRepository.login(credentials);
    }
}
