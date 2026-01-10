import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { PaginationDto, PaginatedResponse } from '../../domain/dtos/pagination.dto';

@Injectable({
  providedIn: 'root'
})
export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  execute(
    pagination?: PaginationDto,
    filters?: { searchTerm?: string; category?: string | null }
  ): Observable<Product[] | PaginatedResponse<Product>> {
    return this.productRepository.getAll(pagination, filters);
  }
}
