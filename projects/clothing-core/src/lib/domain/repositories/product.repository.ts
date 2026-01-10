import { Observable } from 'rxjs';
import { Product } from '../entities/product.entity';
import { PaginationDto, PaginatedResponse } from '../dtos/pagination.dto';

export abstract class ProductRepository {
  abstract getAll(
    pagination?: PaginationDto,
    filters?: { searchTerm?: string; category?: string | null }
  ): Observable<Product[] | PaginatedResponse<Product>>;
  abstract getById(id: string): Observable<Product | null>;
  abstract save(product: Product): Observable<void>;
}
