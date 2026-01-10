import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../domain/entities/product.entity';
import { PaginationDto } from '../../../domain/dtos/pagination.dto';

export const ProductActions = createActionGroup({
    source: 'Product',
    events: {
        'Load Products': props<{ pagination?: PaginationDto }>(),
        'Load Products Success': props<{ products: Product[], total?: number, page?: number, pageSize?: number }>(),
        'Load Products Failure': props<{ error: string }>(),
        'Save Product': props<{ product: Product }>(),
        'Save Product Success': props<{ product: Product }>(),
        'Save Product Failure': props<{ error: string }>(),
        'Set Search Term': props<{ searchTerm: string }>(),
        'Set Category': props<{ category: string | null }>(),
        'Clear Filters': emptyProps(),
    }
});
