import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'clothing-core';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
    providedIn: 'root'
})
export class GetCurrentUserUseCase {
    private repository = inject(AuthRepository);

    execute(): Observable<User | null> {
        return this.repository.getCurrentUser();
    }
}
