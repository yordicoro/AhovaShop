import { Observable } from 'rxjs';
import { Product, PaginationDto, PaginatedResponse } from 'clothing-core';

export abstract class ProductRepository {
    abstract getAll(
        pagination?: PaginationDto,
        filters?: { searchTerm?: string; category?: string | null }
    ): Observable<Product[] | PaginatedResponse<Product>>;

    abstract getById(id: string): Observable<Product | null>;
}
