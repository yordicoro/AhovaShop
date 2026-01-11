import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthPresenter } from '../../../../presenters/base/base-auth.presenter';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="glass border-b border-white/50 px-10 py-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-white/60">
      <div class="flex items-center gap-16">
        <!-- Luxury Admin Logo -->
        <div class="flex items-center gap-3 group cursor-pointer" routerLink="/dashboard">
          <div class="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-500 shadow-xl relative">
            <div class="absolute inset-0 bg-accent-gold opacity-10 blur-lg group-hover:opacity-20 transition-opacity"></div>
            <span class="text-accent-gold font-display font-black text-2xl relative z-10">A</span>
          </div>
          <div class="flex flex-col">
              <span class="text-xs font-black text-slate-950 tracking-[0.3em] font-display uppercase">Ahovashop</span>
              <span class="text-[8px] font-bold text-slate-400 uppercase tracking-[0.5em] -mt-1">Private Luxe</span>
          </div>
        </div>

        <!-- Refined Navigation Links -->
        <div class="hidden lg:flex items-center gap-10">
          <a routerLink="/dashboard" routerLinkActive="text-slate-950 scale-110" class="text-[9px] font-black text-slate-400 hover:text-slate-950 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-gold opacity-0 group-[.scale-110]:opacity-100 transition-opacity"></span>
              Panel
          </a>
          <a routerLink="/orders" routerLinkActive="text-slate-950 scale-110" class="text-[9px] font-black text-slate-400 hover:text-slate-950 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-gold opacity-0 group-[.scale-110]:opacity-100 transition-opacity"></span>
              Pedidos
          </a>
          <a routerLink="/inventory" routerLinkActive="text-slate-950 scale-110" class="text-[9px] font-black text-slate-400 hover:text-slate-950 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-gold opacity-0 group-[.scale-110]:opacity-100 transition-opacity"></span>
              Inventario
          </a>
        </div>
      </div>

      <!-- Secure Session Info -->
      <div class="flex items-center gap-8" *ngIf="auth.user() as user">
        <div class="flex items-center gap-4 group cursor-pointer">
          <div class="text-right hidden sm:block">
            <p class="text-[11px] font-display font-black text-slate-950 leading-none">{{ user.name }}</p>
            <p class="text-[8px] font-bold text-accent-gold uppercase tracking-[0.2em] mt-1.5">{{ user.role === 'ADMIN' ? 'Administrador Elite' : 'Personal Autorizado' }}</p>
          </div>
          <div class="relative p-1 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:border-accent-gold/30 transition-colors">
              <img [src]="user.avatarUrl" class="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" [alt]="user.name">
              <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
        
        <div class="w-px h-8 bg-slate-950/5"></div>

        <button 
          (click)="auth.logout()"
          class="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group relative"
          title="Terminar Sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  `
})
export class Navbar {
  protected auth = inject(AuthPresenter);
}
