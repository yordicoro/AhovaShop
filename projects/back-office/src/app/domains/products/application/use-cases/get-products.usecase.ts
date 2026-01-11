import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, PaginationDto, PaginatedResponse } from 'clothing-core';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class GetProductsUseCase {
    private repository = inject(ProductRepository);

    execute(pagination?: PaginationDto, filters?: { searchTerm?: string; category?: string | null }): Observable<Product[] | PaginatedResponse<Product>> {
        return this.repository.getAll(pagination, filters);
    }
}
