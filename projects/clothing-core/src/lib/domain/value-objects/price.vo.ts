export class Price {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
  }

  getValue(): number {
    return this.value;
  }
}
