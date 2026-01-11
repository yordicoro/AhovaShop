import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'clothing-core';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class SaveProductUseCase {
    private repository = inject(ProductRepository);

    execute(product: Product): Observable<void> {
        return this.repository.save(product);
    }
}
