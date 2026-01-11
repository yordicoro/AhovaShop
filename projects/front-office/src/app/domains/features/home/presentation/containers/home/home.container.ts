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
        <div class="absolute inset-0 bg-slate-950/40 flex items-center px-12 sm:px-24 backdrop-blur-[2px]">
          <div class="max-w-2xl text-white">
            <h2 class="text-4xl sm:text-6xl lg:text-8xl font-display font-black leading-[0.95] mb-6 drop-shadow-2xl tracking-tighter">
              EDICIÓN <br> <span class="text-accent-gold underline decoration-4 underline-offset-8">LIMITADA</span>
            </h2>
            <p class="text-xs sm:text-base font-bold mb-10 drop-shadow-lg uppercase tracking-[0.3em] text-slate-200">Experiencia de Lujo Curada &bull; 2026</p>
            <a routerLink="/shop" class="inline-block bg-accent-gold text-slate-950 px-10 py-4 sm:py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white transition-all active:scale-95 shadow-2xl">
              Explorar Colección
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Icons -->
    <section class="max-w-7xl mx-auto px-4 py-20">
      <div class="grid grid-cols-4 md:grid-cols-8 gap-6 sm:gap-10 overflow-x-auto pb-4 no-scrollbar">
        <div *ngFor="let cat of quickCats" class="flex flex-col items-center gap-4 cursor-pointer group flex-shrink-0">
          <div class="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl glass flex items-center justify-center group-hover:bg-slate-900 group-hover:scale-110 border border-white/40 group-hover:border-accent-gold/50 transition-all duration-500 shadow-xl group-hover:shadow-accent-gold/20">
             <img [src]="cat.icon" class="w-8 h-8 sm:w-12 sm:h-12 object-contain group-hover:invert transition-all duration-500">
          </div>
          <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 group-hover:text-slate-950 transition-colors text-center">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Grids -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Promoción 1 -->
        <div class="relative aspect-[16/9] overflow-hidden group cursor-pointer rounded-[2.5rem] shadow-2xl" routerLink="/shop">
           <img src="https://images.unsplash.com/photo-1542060717-1738b295ca88?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110">
           <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-10 flex flex-col justify-end">
             <p class="text-[10px] font-black tracking-[0.3em] text-accent-gold mb-2 uppercase">Legado Atemporal</p>
             <h3 class="text-white text-3xl sm:text-4xl font-display font-black uppercase leading-none tracking-tighter">Jeans & Denim Premium</h3>
             <div class="w-12 h-1 bg-accent-gold mt-6 group-hover:w-24 transition-all duration-500"></div>
           </div>
        </div>
        <!-- Promoción 2 -->
        <div class="relative aspect-[16/9] overflow-hidden group cursor-pointer rounded-[2.5rem] shadow-2xl" routerLink="/shop">
           <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110">
           <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-10 flex flex-col justify-end">
             <p class="text-[10px] font-black tracking-[0.3em] text-accent-gold mb-2 uppercase">Ingeniería Elite</p>
             <h3 class="text-white text-3xl sm:text-4xl font-display font-black uppercase leading-none tracking-tighter">Calzado de Alta Gama</h3>
             <div class="w-12 h-1 bg-accent-gold mt-6 group-hover:w-24 transition-all duration-500"></div>
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
