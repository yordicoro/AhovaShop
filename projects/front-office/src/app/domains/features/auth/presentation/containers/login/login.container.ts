import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginPresenter } from '../../presenters/login.presenter';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [LoginPresenter],
  template: `
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div class="max-w-md w-full glass rounded-[2.5rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-gold/5 blur-3xl rounded-full"></div>
        
        <div class="relative z-10">
          <div class="text-center space-y-2 mb-10">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-slate-950 rounded-2xl mb-4 rotate-3">
                  <span class="text-accent-gold font-display font-black text-xl">A</span>
              </div>
              <h2 class="text-3xl font-display font-black text-slate-950 tracking-tight">Acceso Privado</h2>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Portal de Autenticación Segura</p>
          </div>
          
          <form [formGroup]="presenter.loginForm" (ngSubmit)="presenter.login()" class="space-y-6">
            <div class="space-y-4">
              <div class="group">
                <label for="username" class="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Identidad</label>
                <input 
                    formControlName="username" 
                    id="username" 
                    type="text" 
                    required 
                    class="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all outline-none placeholder-slate-300" 
                    placeholder="Usuario (ej. admin)">
              </div>
              <div class="group">
                <label for="password" class="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Contraseña</label>
                <input 
                    formControlName="password" 
                    id="password" 
                    type="password" 
                    required 
                    class="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all outline-none placeholder-slate-300" 
                    placeholder="Contraseña">
              </div>
            </div>
  
            <!-- Recaptcha Simulado Premium (Punto 07) -->
            <div class="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-white/5 shadow-inner">
              <div class="flex items-center gap-4">
                <div class="relative">
                    <input 
                    type="checkbox" 
                    id="recaptcha" 
                    formControlName="recaptcha"
                    class="w-6 h-6 rounded-lg border-white/10 bg-white/5 text-accent-gold focus:ring-accent-gold/50 cursor-pointer appearance-none checked:bg-accent-gold border flex items-center justify-center after:content-[''] after:w-2 after:h-4 after:border-white after:border-b-2 after:border-r-2 after:rotate-45 after:hidden checked:after:block">
                </div>
                <label for="recaptcha" class="text-[10px] font-bold text-slate-300 uppercase tracking-widest cursor-pointer">
                  Verificación Humana
                </label>
              </div>
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" class="w-6 h-6 grayscale opacity-30 px-1" alt="reCAPTCHA">
            </div>
  
            <div *ngIf="presenter.error$ | async as error" class="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center bg-red-500/5 p-3 rounded-xl border border-red-500/10">
              {{ error }}
            </div>
  
            <div class="pt-4">
              <button 
                type="submit" 
                [disabled]="(presenter.isLoading$ | async) || presenter.loginForm.invalid" 
                class="btn-gold w-full py-5 text-[11px] disabled:opacity-30 disabled:grayscale">
                {{ (presenter.isLoading$ | async) ? 'Autenticando...' : 'Establecer Conexión' }}
              </button>
            </div>
          </form>

          <div class="mt-8 text-center">
              <a routerLink="/" class="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors flex items-center justify-center gap-2">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Volver a la Boutique
              </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  protected presenter = inject(LoginPresenter);
}
