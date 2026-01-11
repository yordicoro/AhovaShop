import { CommonModule } from '@angular/common';
import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectItems, ProductActions } from 'clothing-core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="bg-primary/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 shadow-2xl">
      <!-- Main Bar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-8">
          
          <!-- Logo Section -->
          <div class="flex items-center gap-3 group cursor-pointer" routerLink="/">
            <div class="relative w-12 h-12 flex items-center justify-center">
                <div class="absolute inset-0 bg-accent-gold rotate-45 rounded-lg opacity-20 group-hover:rotate-90 transition-transform duration-500"></div>
                <span class="text-accent-gold font-display font-black text-2xl relative z-10">A</span>
            </div>
            <div class="flex flex-col -gap-1">
                <span class="text-xl font-display font-black text-white tracking-[0.2em]">AHOVASHOP</span>
                <span class="text-[8px] font-bold text-accent-gold tracking-[0.4em] uppercase">Private Luxe</span>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-10">
            <a (click)="onCategorySelect(null)" class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-accent-gold transition-all cursor-pointer relative group/link">
                Inicio
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-accent-gold transition-all group-hover/link:w-full"></span>
            </a>
            <a (click)="onCategorySelect(CATEGORIES.WOMEN)" class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-accent-gold transition-all cursor-pointer relative group/link">
                Mujer
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-accent-gold transition-all group-hover/link:w-full"></span>
            </a>
            <a (click)="onCategorySelect(CATEGORIES.MEN)" class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-accent-gold transition-all cursor-pointer relative group/link">
                Hombre
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-accent-gold transition-all group-hover/link:w-full"></span>
            </a>
            <a (click)="onCategorySelect(CATEGORIES.JEWELRY)" class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-accent-gold transition-all cursor-pointer relative group/link">
                Joyería
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-accent-gold transition-all group-hover/link:w-full"></span>
            </a>
          </nav>

          <!-- Search & Actions -->
          <div class="flex items-center gap-6">
            <!-- Search Icon (Elegant) -->
            <button class="text-slate-400 hover:text-white transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>

            <!-- User -->
            <a routerLink="/profile" class="text-slate-400 hover:text-white transition-colors relative">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </a>
            
            <!-- Cart Icon with Badge -->
            <a routerLink="/cart" class="relative group">
               <div class="p-2.5 bg-white/5 rounded-full group-hover:bg-accent-gold/10 transition-all border border-white/5 group-hover:border-accent-gold/20">
                    <svg class="h-5 w-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
               </div>
               @if (cartCount() > 0) {
                 <span class="absolute -top-1 -right-1 bg-white text-slate-900 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-xl ring-2 ring-primary">
                   {{ cartCount() }}
                 </span>
               }
            </a>

            <!-- Mobile Toggle -->
            <button (click)="toggleMobileMenu()" class="lg:hidden text-slate-400 hover:text-white">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="isMenuOpen() ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      @if (isMenuOpen()) {
        <div class="lg:hidden absolute top-20 w-full glass-dark border-t border-white/10 animate-slide-down shadow-2xl">
          <div class="px-6 py-8 flex flex-col gap-6">
            <a (click)="onCategorySelect(null)" class="text-xs font-bold uppercase tracking-widest text-slate-300">Inicio</a>
            <a (click)='onCategorySelect("women&apos;s clothing")' class="text-xs font-bold uppercase tracking-widest text-slate-300">Novedades</a>
            <a (click)='onCategorySelect("men&apos;s clothing")' class="text-xs font-bold uppercase tracking-widest text-slate-300">Boutique Hombre</a>
            <a (click)='onCategorySelect("jewelery")' class="text-xs font-bold uppercase tracking-widest text-accent-gold">Colección Curada</a>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  private store = inject(Store);

  readonly CATEGORIES = {
    WOMEN: "women's clothing",
    MEN: "men's clothing",
    JEWELRY: "jewelery"
  };

  // Using Signals for local state (Point 06)
  isMenuOpen = signal(false);

  // Using toSignal to convert NgRx selector to Signal (integration)
  cartItems = toSignal(this.store.select(selectItems), { initialValue: [] });

  // Computed Signal for performance (Point 06)
  cartCount = computed(() => this.cartItems()?.reduce((acc, item) => acc + item.quantity, 0) || 0);

  private router = inject(Router);

  toggleMobileMenu() {
    this.isMenuOpen.update(val => !val);
  }

  onSearch(searchTerm: string) {
    this.store.dispatch(ProductActions.setSearchTerm({ searchTerm }));
    this.router.navigate(['/shop']);
  }

  onCategorySelect(category: string | null) {
    this.store.dispatch(ProductActions.setCategory({ category }));
    this.router.navigate(['/shop']);
    if (this.isMenuOpen()) this.isMenuOpen.set(false);
  }
}
