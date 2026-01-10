import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthPresenter } from '../../../../core/presentation/base/base-auth.presenter';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center gap-12">
        <!-- Logo -->
        <div class="flex items-center gap-2 group cursor-pointer" routerLink="/dashboard">
          <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span class="text-white font-black text-xl">A</span>
          </div>
          <span class="text-xl font-black text-slate-900 tracking-tighter">AHOVA<span class="text-slate-400">SHOP</span></span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-8">
          <a routerLink="/dashboard" routerLinkActive="text-slate-900 after:w-full" class="text-sm font-bold text-slate-400 hover:text-slate-900 transition-all relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-slate-900 after:transition-all">DASHBOARD</a>
          <a routerLink="/orders" routerLinkActive="text-slate-900 after:w-full" class="text-sm font-bold text-slate-400 hover:text-slate-900 transition-all relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-slate-900 after:transition-all">PEDIDOS</a>
          <a routerLink="/inventory" routerLinkActive="text-slate-900 after:w-full" class="text-sm font-bold text-slate-400 hover:text-slate-900 transition-all relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-slate-900 after:transition-all">INVENTARIO</a>
        </div>
      </div>

      <!-- User Info & Logout -->
      <div class="flex items-center gap-6" *ngIf="auth.user() as user">
        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm font-bold text-slate-900 leading-tight">{{ user.name }}</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ user.role }}</p>
          </div>
          <img [src]="user.avatarUrl" class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-100" [alt]="user.name">
        </div>
        
        <button 
          (click)="auth.logout()"
          class="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Cerrar Sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  `
})
export class Navbar {
  protected auth = inject(AuthPresenter);
}
