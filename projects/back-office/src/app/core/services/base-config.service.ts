import { Injectable } from '@angular/core';

export type ApiType = 'business' | 'security' | 'stock' | 'products';

@Injectable({
    providedIn: 'root'
})
export class BaseConfigService {
    private readonly apis: Record<ApiType, string> = {
        business: 'http://localhost:3000/api/v1',
        security: 'http://localhost:3000/api/v1/security',
        stock: 'http://localhost:3000/api/v1/stock',
        products: 'http://localhost:3000/api/v1/products'
    };

    getApiUrl(type: ApiType): string {
        return this.apis[type] || this.apis.business;
    }
}
