import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'shop-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <main class="min-h-screen bg-slate-50">
        <router-outlet />
    </main>
  `
})
export class ShopLayout { }
