export interface OrderDto {
    id: string;
    customerId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: string;
    createdAt: string;
}
