export class OrderItemValueObject {
    constructor(
        public readonly productId: string,
        public readonly productName: string,
        public readonly quantity: number,
        public readonly price: number
    ) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
    }

    get total(): number {
        return this.quantity * this.price;
    }
}
