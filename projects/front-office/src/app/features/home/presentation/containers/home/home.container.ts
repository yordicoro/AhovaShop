import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Main Banner Slider (Simulation) -->
    <section class="max-w-[1440px] mx-auto px-0 sm:px-4 lg:px-8 mt-4">
      <div class="relative aspect-[21/9] sm:aspect-[21/7] w-full overflow-hidden bg-slate-200 group">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          alt="Retail Banner"
        >
        <div class="absolute inset-0 bg-black/20 flex items-center px-12 sm:px-24">
          <div class="max-w-xl text-white">
            <h2 class="text-3xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-4 drop-shadow-lg">
              Temporada de <br> <span class="text-accent underline decoration-4 underline-offset-8">Descuentos</span>
            </h2>
            <p class="text-sm sm:text-lg font-medium mb-8 drop-shadow-md">Hasta 60% de descuento en las mejores marcas internacionales.</p>
            <a routerLink="/shop" class="inline-block bg-primary text-white px-8 py-3 sm:py-4 rounded-none font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-slate-800 transition-all active:scale-95">
              Ver Ofertas
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Icons -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-4 md:grid-cols-8 gap-4 sm:gap-8 overflow-x-auto pb-4 no-scrollbar">
        <div *ngFor="let cat of quickCats" class="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-light border border-transparent group-hover:border-primary/20 transition-all">
             <img [src]="cat.icon" class="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform">
          </div>
          <span class="text-[10px] sm:text-xs font-bold uppercase tracking-tighter text-slate-700 text-center">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Grids -->
    <section class="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        <!-- Promoción 1 -->
        <div class="relative aspect-[16/9] overflow-hidden group cursor-pointer" routerLink="/shop">
           <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
           <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-10 flex flex-col justify-end">
             <h3 class="text-white text-2xl sm:text-3xl font-display font-bold uppercase leading-none">Jeans & Denim</h3>
             <p class="text-slate-200 text-xs sm:text-sm mt-3 uppercase font-medium">Desde $59.00</p>
           </div>
        </div>
        <!-- Promoción 2 -->
        <div class="relative aspect-[16/9] overflow-hidden group cursor-pointer" routerLink="/shop">
           <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
           <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-10 flex flex-col justify-end">
             <h3 class="text-white text-2xl sm:text-3xl font-display font-bold uppercase leading-none">Calzado Deportivo</h3>
             <p class="text-slate-200 text-xs sm:text-sm mt-3 uppercase font-medium">Marcas Premium</p>
           </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  standalone: true
})
export class HomeComponent {
  quickCats = [
    { name: 'Moda Mujer', icon: 'https://cdn-icons-png.flaticon.com/512/2822/2822765.png' },
    { name: 'Moda Hombre', icon: 'https://cdn-icons-png.flaticon.com/512/3534/3534312.png' },
    { name: 'Electro', icon: 'https://cdn-icons-png.flaticon.com/512/1261/1261143.png' },
    { name: 'Deco Hogar', icon: 'https://cdn-icons-png.flaticon.com/512/2311/2311354.png' },
    { name: 'Belleza', icon: 'https://cdn-icons-png.flaticon.com/512/1940/1940922.png' },
    { name: 'Relojes', icon: 'https://cdn-icons-png.flaticon.com/512/2177/2177266.png' },
    { name: 'Calzado', icon: 'https://cdn-icons-png.flaticon.com/512/2742/2742188.png' },
    { name: 'Deportes', icon: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' },
  ];
}
