import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPresenter } from '../../presenter/login.presenter';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [LoginPresenter],
    template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-slate-200/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <!-- Login Card -->
      <div class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-10 relative z-10 transition-all">
        <div class="text-center mb-10">
          <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Bienvenido</h1>
          <p class="text-slate-500 font-medium">Panel de Administración AhovaShop</p>
        </div>

        @if (presenter.error()) {
          <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-shake">
            {{ presenter.error() }}
          </div>
        }

        <form [formGroup]="presenter.form" (ngSubmit)="presenter.onSubmit()" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
            <input 
              type="email" 
              formControlName="email"
              placeholder="admin@ahovashop.com"
              class="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium"
            >
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              formControlName="password"
              placeholder="••••••••"
              class="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium"
            >
          </div>

          <button 
            type="submit"
            [disabled]="presenter.isSubmitting()"
            class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 mt-4"
          >
            @if (presenter.isSubmitting()) {
              <div class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Validando...
              </div>
            } @else {
              Entrar al Panel
            }
          </button>
        </form>

        <div class="mt-10 pt-10 border-t border-slate-100 text-center">
          <p class="text-slate-400 text-xs font-medium">
            ¿Olvidaste tus credenciales? <br> Contacta con soporte técnico.
          </p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
  `]
})
export class LoginPage {
    protected presenter = inject(LoginPresenter);
}
