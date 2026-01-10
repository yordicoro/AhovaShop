import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable({
    providedIn: 'root'
})
export class GetCurrentUserUseCase {
    constructor(private readonly authRepository: AuthRepository) { }

    execute(): Observable<User | null> {
        return this.authRepository.getCurrentUser();
    }
}
