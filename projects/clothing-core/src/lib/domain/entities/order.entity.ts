export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED';

export class OrderEntity {
    constructor(
        public readonly id: string,
        public readonly customerId: string,
        public readonly totalAmount: number,
        public readonly status: 'PENDING' | 'CONFIRMED' | 'SHIPPED',
        public readonly createdAt: Date
    ) { }
}
