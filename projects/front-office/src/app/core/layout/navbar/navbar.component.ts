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
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <!-- Top Bar (Search, Logo, User) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-4">
          <!-- Logo -->
          <div class="flex items-center gap-2 group cursor-pointer" routerLink="/dashboard">
          <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span class="text-white font-black text-xl">A</span>
          </div>
          <span class="text-xl font-black text-slate-900 tracking-tighter">AHOVA<span class="text-slate-400">SHOP</span></span>
        </div>
          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex flex-grow max-w-2xl px-4">
            <div class="relative w-full">
              <input 
                type="text" 
                #searchInput
                (input)="onSearch(searchInput.value)"
                placeholder="Busca tus marcas, productos y más..." 
                class="w-full bg-slate-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              >
              <svg class="absolute left-3 top-3.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 sm:gap-6">
            <a routerLink="/profile" class="hidden sm:flex items-center gap-1 cursor-pointer hover:text-primary transition-colors text-slate-700 decoration-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span class="text-xs font-semibold uppercase tracking-wider hidden lg:inline">Mi Cuenta</span>
            </a>
            
            <a routerLink="/cart" class="relative flex items-center gap-1 group">
               <svg class="h-6 w-6 text-slate-700 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
               @if (cartCount() > 0) {
                 <span class="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg shadow-primary/20 animate-bounce">
                   {{ cartCount() }}
                 </span>
               }
               <span class="text-xs font-semibold uppercase tracking-wider hidden lg:inline ml-1">Carrito</span>
            </a>

            <!-- Mobile Menu Toggle -->
            <button (click)="toggleMobileMenu()" class="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                @if (!isMenuOpen()) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                }
              </svg>
            </button>
          </div>
        </div>

        <!-- Search Bar (Mobile Only) -->
        <div class="md:hidden pb-4">
          <div class="relative w-full">
            <input 
              type="text" 
              #mobileSearchInput
              (input)="onSearch(mobileSearchInput.value)"
              placeholder="¿Qué buscas hoy?" 
              class="w-full bg-slate-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm outline-none"
            >
            <svg class="absolute left-3 top-3.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Mobile Categories Dropdown -->
        @if (isMenuOpen()) {
          <div class="md:hidden bg-white border-t border-slate-100 py-4 absolute w-full left-0 z-40 shadow-xl animate-fade-in-up">
             <div class="flex flex-col px-6 gap-4">
               <a (click)="onCategorySelect(null)" class="text-sm font-bold uppercase tracking-widest text-slate-800 cursor-pointer">Moda</a>
               <a (click)='onCategorySelect("women&apos;s clothing")' class="text-sm font-bold uppercase tracking-widest text-slate-800 cursor-pointer">Mujer</a>
               <a (click)='onCategorySelect("men&apos;s clothing")' class="text-sm font-bold uppercase tracking-widest text-slate-800 cursor-pointer">Hombre</a>
               <a (click)='onCategorySelect("jewelery")' class="text-sm font-bold uppercase tracking-widest text-accent cursor-pointer">Ofertas</a>
             </div>
          </div>
        }
      </div>

      <!-- Bottom Bar (Categories - Desktop) -->
      <nav class="hidden md:block bg-slate-50 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center space-x-8 h-12">
            <a (click)="onCategorySelect(null)" class="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-primary border-b-2 border-transparent hover:border-primary h-full flex items-center transition-all cursor-pointer">Moda</a>
            <a (click)='onCategorySelect("women&apos;s clothing")' class="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-primary border-b-2 border-transparent hover:border-primary h-full flex items-center transition-all cursor-pointer">Mujer</a>
            <a (click)='onCategorySelect("men&apos;s clothing")' class="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-primary border-b-2 border-transparent hover:border-primary h-full flex items-center transition-all cursor-pointer">Hombre</a>
            <a (click)='onCategorySelect("jewelery")' class="text-xs font-bold uppercase tracking-widest text-accent border-b-2 border-transparent hover:border-accent h-full flex items-center transition-all cursor-pointer">Ofertas</a>
            <a (click)='onCategorySelect("electronics")' class="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-primary border-b-2 border-transparent hover:border-primary h-full flex items-center transition-all cursor-pointer">Novedades</a>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class NavbarComponent {
  private store = inject(Store);

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
