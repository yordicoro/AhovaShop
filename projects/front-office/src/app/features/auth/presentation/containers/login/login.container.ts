import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthIsLoading, selectAuthError } from 'clothing-core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-slate-600">
            Or <a href="#" class="font-medium text-primary hover:text-secondary transition-colors">start your 14-day free trial</a>
          </p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input formControlName="username" id="username" name="username" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all" placeholder="Username (admin)">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input formControlName="password" id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all" placeholder="Password (admin123)">
            </div>
          </div>

          <div *ngIf="error$ | async as error" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
            {{ error }}
          </div>

          <div>
            <button type="submit" [disabled]="isLoading$ | async" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-lg shadow-slate-900/20 disabled:bg-slate-400">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-slate-500 group-hover:text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              {{ (isLoading$ | async) ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    isLoading$ = this.store.select(selectAuthIsLoading);
    error$ = this.store.select(selectAuthError);

    onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.store.dispatch(AuthActions.login({
                username: username!,
                password: password!
            }));
        }
    }
}
