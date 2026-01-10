import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, of, catchError } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { LoggerService } from '../services/logger.service';
import { PaginationDto, PaginatedResponse } from '../../domain/dtos/pagination.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryImpl extends ProductRepository {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);

  // URL del backend (json-server)
  private readonly API_URL = 'http://localhost:3000/products';

  getAll(
    pagination?: PaginationDto,
    filters?: { searchTerm?: string; category?: string | null }
  ): Observable<Product[] | PaginatedResponse<Product>> {
    this.logger.debug('Fetching products from Backend API');

    let params = new HttpParams();

    if (pagination) {
      params = params.set('_page', pagination.page.toString());
      params = params.set('_limit', pagination.pageSize.toString());
    }

    if (filters?.searchTerm) {
      params = params.set('q', filters.searchTerm);
    }

    if (filters?.category) {
      params = params.set('category', filters.category);
    }

    // json-server retorna el total en el header 'X-Total-Count'
    return this.http.get<any[]>(this.API_URL, { params, observe: 'response' }).pipe(
      map(response => {
        const items = response.body || [];
        const total = Number(response.headers.get('X-Total-Count')) || items.length;

        const products = items.map(item => this.mapToEntity(item));

        if (pagination) {
          return {
            data: products,
            total: total,
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalPages: Math.ceil(total / pagination.pageSize)
          } as PaginatedResponse<Product>;
        }

        return products;
      })
    );
  }

  getById(id: string): Observable<Product | null> {
    this.logger.debug(`Fetching product by id: ${id}`);
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map(item => item ? this.mapToEntity(item) : null),
      catchError(() => of(null))
    );
  }

  save(product: Product): Observable<void> {
    this.logger.info('Persisting product to Backend', product);

    // Convertimos la entidad a un objeto plano para el backend
    const productData = { ...product };

    // json-server maneja POST para creación y PUT para actualización completa.
    // Intentamos ver si existe primero
    return this.http.get(`${this.API_URL}/${product.id}`).pipe(
      // Si existe, actualizamos con PUT
      switchMap(() => this.http.put<void>(`${this.API_URL}/${product.id}`, productData)),
      // Si no existe (error 404), creamos con POST
      catchError(error => {
        if (error.status === 404) {
          return this.http.post<void>(this.API_URL, productData);
        }
        throw error;
      }),
      map(() => void 0)
    );
  }

  private mapToEntity(p: any): Product {
    const product = new Product(
      p.id.toString(),
      p.name,
      p.price,
      p.stock,
      p.description,
      p.category,
      p.imageUrl || p.image,
      p.brand,
      p.gender,
      p.season,
      p.subcategory,
      p.material,
      p.composition,
      p.sizes,
      p.colors,
      p.images,
      p.tags,
      p.variants
    );
    return product;
  }
}
