import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, LoginCredentials } from 'clothing-core';
import { BaseFormPresenter } from '../../../../shared/presenters/base/base-form.presenter';
import { AuthPresenter } from '../../../../shared/presenters/base/base-auth.presenter';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../application/use-cases/login.usecase';

@Injectable()
export class LoginPresenter extends BaseFormPresenter<User> {
    private loginUseCase = inject(LoginUseCase);
    private authPresenter = inject(AuthPresenter);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    public form: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]] // password real en el repo mock se usa email
    });

    constructor() {
        super();
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.markFormGroupTouched(this.form);
            return;
        }

        this.setLoading(true);
        const credentials: LoginCredentials = {
            email: this.form.value.email,
            token: this.form.value.password // Usamos el password como token para el mock
        };

        this.loginUseCase.execute(credentials).subscribe({
            next: (user) => {
                this.setLoading(false);
                if (user.role === 'ADMIN') {
                    this.authPresenter.setUser(user);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.setError('Acceso denegado. Se requiere rol de Administrador.');
                }
            },
            error: (err) => {
                this.setLoading(false);
                this.setError('Credenciales inválidas. Intenta con admin@ahovashop.com');
            }
        });
    }
}
