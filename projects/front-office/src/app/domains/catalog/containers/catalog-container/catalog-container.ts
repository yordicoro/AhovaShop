import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductActions, selectFilteredProducts } from 'clothing-core';

@Component({
    selector: 'app-catalog-container',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2>Catálogo de Productos</h2>

    <div *ngFor="let product of products()">
      <strong>{{ product.name }}</strong> - S/. {{ product.price }}
    </div>
  `
})
export class CatalogContainerComponent implements OnInit {

    private store = inject(Store);

    products = toSignal(this.store.select(selectFilteredProducts), { initialValue: [] });

    ngOnInit(): void {
        this.store.dispatch(ProductActions.loadProducts({
            pagination: { page: 1, pageSize: 12 }
        }));
    }
}
