import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'clothing-core';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class GetProductByIdUseCase {
    private repository = inject(ProductRepository);

    execute(id: string): Observable<Product | null> {
        return this.repository.getById(id);
    }
}
