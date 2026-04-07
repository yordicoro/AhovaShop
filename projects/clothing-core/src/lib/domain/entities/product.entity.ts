export type Gender = 'MEN' | 'WOMEN' | 'UNISEX' | 'KIDS';
export type Season = 'SPRING_SUMMER' | 'FALL_WINTER' | 'ALL_SEASON';

export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public description?: string,
    public category?: string,
    public imageUrl?: string,
    public brand?: string,
    public gender?: Gender,
    public season?: Season,
    public subcategory?: string,
    public material?: string,
    public composition?: string,
    public sizes?: string[],
    public colors?: string[],
    public images?: string[],
    public tags?: string[],
    public variants?: ProductVariant[]
  ) {
    if (!this.sizes) this.sizes = [];
    if (!this.colors) this.colors = [];
    if (!this.images) this.images = this.imageUrl ? [this.imageUrl] : [];
    if (!this.tags) this.tags = [];
    if (!this.variants) this.variants = [];
  }

  updateStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Stock inválido');
    }
    this.stock = quantity;
  }

  isSizeAvailable(size: string): boolean {
    return this.sizes?.includes(size) ?? false;
  }

  isColorAvailable(color: string): boolean {
    return this.colors?.includes(color) ?? false;
  }

  getVariantStock(size: string, color: string): number {
    const variant = this.variants?.find(v => v.size === size && v.color === color);
    return variant?.stock ?? 0;
  }

  get primaryImage(): string | undefined {
    return this.images?.[0] ?? this.imageUrl;
  }
}
