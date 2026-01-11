import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, PaginationDto, PaginatedResponse, ProductRepository as CoreProductRepository } from 'clothing-core';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class ProductRepositoryImpl implements ProductRepository {
    private coreRepo = inject(CoreProductRepository);

    getAll(pagination?: PaginationDto, filters?: { searchTerm?: string; category?: string | null }): Observable<Product[] | PaginatedResponse<Product>> {
        return this.coreRepo.getAll(pagination, filters);
    }

    getById(id: string): Observable<Product | null> {
        return this.coreRepo.getById(id);
    }
}
