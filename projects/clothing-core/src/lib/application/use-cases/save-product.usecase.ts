import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable({
    providedIn: 'root'
})
export class SaveProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    execute(product: Product): Observable<void> {
        return this.productRepository.save(product);
    }
}
