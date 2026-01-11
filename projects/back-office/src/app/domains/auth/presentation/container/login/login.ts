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
      <!-- Luxury Background Elements -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-accent-gold/5 blur-3xl rounded-full"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-900/5 blur-3xl rounded-full"></div>

      <!-- Login Card (Glassmorphism) -->
      <div class="w-full max-w-md glass rounded-[3rem] p-12 border border-white/40 shadow-2xl relative z-10">
        <div class="text-center mb-12">
          <div class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-2xl relative">
            <div class="absolute inset-0 bg-accent-gold opacity-10 blur-xl"></div>
            <span class="text-accent-gold font-display font-black text-2xl relative z-10">A</span>
          </div>
          <h1 class="text-3xl font-display font-black text-slate-950 tracking-tight">Portal de Administración</h1>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Ahovashop Boutique Privada</p>
        </div>

        @if (presenter.error()) {
          <div class="mb-8 p-4 bg-red-400/5 border border-red-500/10 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
            {{ presenter.error() }}
          </div>
        }

        <form [formGroup]="presenter.form" (ngSubmit)="presenter.onSubmit()" class="space-y-8">
          <div class="space-y-6">
            <div class="group">
              <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-4">Identidad Autorizada</label>
              <input 
                type="email" 
                formControlName="email"
                placeholder="admin@ahova.private"
                class="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/5 outline-none transition-all font-medium text-sm placeholder-slate-300"
              >
            </div>

            <div class="group">
              <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-4">Contraseña Segura</label>
              <input 
                type="password" 
                formControlName="password"
                placeholder="••••••••"
                class="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/5 outline-none transition-all font-medium text-sm placeholder-slate-300"
              >
            </div>
          </div>

          <div class="pt-4">
            <button 
              type="submit"
              [disabled]="presenter.isSubmitting()"
              class="btn-gold w-full py-5 shadow-2xl shadow-accent-gold/20 disabled:opacity-30 disabled:grayscale"
            >
              @if (presenter.isSubmitting()) {
                <div class="flex items-center justify-center gap-2">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span class="text-[10px] uppercase font-bold tracking-widest">Verificando...</span>
                </div>
              } @else {
                <span class="text-[10px] uppercase font-bold tracking-widest">Establecer Acceso</span>
              }
            </button>
          </div>
        </form>

        <div class="mt-12 text-center">
          <p class="text-slate-400 text-[8px] font-bold uppercase tracking-[0.2em] leading-loose">
            Protocolos de Seguridad Empresarial Activos <br> 
            <span class="text-slate-300">El acceso no autorizado está estrictamente prohibido</span>
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
