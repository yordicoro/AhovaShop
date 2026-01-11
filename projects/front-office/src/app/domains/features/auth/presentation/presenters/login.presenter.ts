import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthIsLoading, selectAuthError } from 'clothing-core';

@Injectable()
export class LoginPresenter {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    readonly loginForm: FormGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        recaptcha: [false, Validators.requiredTrue]
    });

    readonly isLoading$ = this.store.select(selectAuthIsLoading);
    readonly error$ = this.store.select(selectAuthError);

    login() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.store.dispatch(AuthActions.login({
                username: username!,
                password: password!
            }));
        }
    }
}
