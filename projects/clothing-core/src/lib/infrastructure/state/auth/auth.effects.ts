import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { LoggerService } from '../../services/logger.service';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);
    private logger = inject(LoggerService);

    initAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuthentication),
            exhaustMap(() =>
                this.authService.getCurrentUser().pipe(
                    map(user => {
                        if (user) {
                            this.logger.info('Sesión recuperada desde LocalStorage', user.name);
                            return AuthActions.loginSuccess({ user });
                        }
                        return { type: 'noop' };
                    })
                )
            )
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ username, password }) => {
                this.logger.debug('Iniciando intento de login', { username });
                return this.authService.login({ email: username, token: password }).pipe(
                    map((user) => {
                        this.logger.info('Login exitoso', user.name);
                        return AuthActions.loginSuccess({ user });
                    }),
                    catchError((error) => {
                        this.logger.error('Error en autenticación', error);
                        return of(AuthActions.loginFailure({ error: 'Credenciales inválidas.' }));
                    })
                );
            })
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(() => this.router.navigate(['/']))
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap(() =>
                this.authService.logout().pipe(
                    tap(() => this.router.navigate(['/login']))
                )
            )
        ),
        { dispatch: false }
    );
}
