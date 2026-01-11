import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../../../../shared/ui/templates/components/navbar/navbar";

@Component({
    selector: 'orders-layout',
    standalone: true,
    imports: [RouterOutlet, Navbar],
    template: `
    <navbar></navbar>
    <main class="min-h-screen bg-slate-50">
        <router-outlet />
    </main>
  `
})
export class OrdersLayout { }
