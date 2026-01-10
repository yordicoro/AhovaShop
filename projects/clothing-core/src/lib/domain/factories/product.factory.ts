import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class ProductFactory {
    static create(name: string, price: number, stock: number): Product {
        if (price < 0) throw new Error('Price cannot be negative');
        if (stock < 0) throw new Error('Stock cannot be negative');

        return new Product(
            uuidv4(),
            name,
            price,
            stock
        );
    }

    static recreate(id: string, name: string, price: number, stock: number): Product {
        return new Product(id, name, price, stock);
    }
}
