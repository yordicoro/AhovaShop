import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product, Gender, Season } from 'clothing-core';
import { BaseFormPresenter } from '../../../../shared/presenters/base/base-form.presenter';
import { Router } from '@angular/router';
import { SaveProductUseCase } from '../../application/use-cases/save-product.usecase';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.usecase';

@Injectable()
export class ProductFormPresenter extends BaseFormPresenter<Product> {
    private fb = inject(FormBuilder);
    private saveProductUseCase = inject(SaveProductUseCase);
    private getProductByIdUseCase = inject(GetProductByIdUseCase);
    private router = inject(Router);

    // Opciones para selects
    public readonly genderOptions: { value: Gender; label: string }[] = [
        { value: 'MEN', label: 'Hombre' },
        { value: 'WOMEN', label: 'Mujer' },
        { value: 'UNISEX', label: 'Unisex' },
        { value: 'KIDS', label: 'Niños' }
    ];

    public readonly seasonOptions: { value: Season; label: string }[] = [
        { value: 'SPRING_SUMMER', label: 'Primavera/Verano' },
        { value: 'FALL_WINTER', label: 'Otoño/Invierno' },
        { value: 'ALL_SEASON', label: 'Todo el Año' }
    ];

    public readonly availableSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    public readonly availableColors = [
        { value: 'Negro', hex: '#000000' },
        { value: 'Blanco', hex: '#FFFFFF' },
        { value: 'Gris', hex: '#808080' },
        { value: 'Azul', hex: '#0000FF' },
        { value: 'Rojo', hex: '#FF0000' },
        { value: 'Verde', hex: '#008000' },
        { value: 'Amarillo', hex: '#FFFF00' },
        { value: 'Rosa', hex: '#FFC0CB' },
        { value: 'Morado', hex: '#800080' },
        { value: 'Beige', hex: '#F5F5DC' }
    ];

    public form: FormGroup = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        brand: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0.01)]],
        stock: [0, [Validators.required, Validators.min(0)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        category: ['', [Validators.required]],
        subcategory: [''],
        gender: ['', [Validators.required]],
        season: [''],
        material: [''],
        composition: [''],
        imageUrl: ['', [Validators.required]],
        sizes: [[], [Validators.required]], // Array of selected sizes
        colors: [[], [Validators.required]], // Array of selected colors
        images: this.fb.array([]), // Multiple images
        tags: [[]] // Array of tags
    });

    public isEditMode = false;

    constructor() {
        super();
        this.initializeFormSignals();
        this.setupCategorySubscription();
    }

    private setupCategorySubscription(): void {
        this.form.get('category')?.valueChanges.subscribe(category => {
            const sizesControl = this.form.get('sizes');
            const colorsControl = this.form.get('colors');

            const noSizingCategories = ['electronics', 'jewelery'];
            const isNoSizingCategory = noSizingCategories.includes(category);

            if (isNoSizingCategory) {
                sizesControl?.clearValidators();
                colorsControl?.clearValidators();
            } else {
                sizesControl?.setValidators([Validators.required]);
                colorsControl?.setValidators([Validators.required]);
            }

            sizesControl?.updateValueAndValidity();
            colorsControl?.updateValueAndValidity();
        });
    }

    public get showSizing(): boolean {
        const category = this.form.get('category')?.value;
        const noSizingCategories = ['electronics', 'jewelery'];
        return !noSizingCategories.includes(category);
    }

    public loadProduct(id: string): void {
        this.setLoading(true);
        this.isEditMode = true;
        this.getProductByIdUseCase.execute(id).subscribe({
            next: (product) => {
                if (product) {
                    this.form.patchValue({
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        stock: product.stock,
                        description: product.description,
                        category: product.category,
                        subcategory: product.subcategory,
                        gender: product.gender,
                        season: product.season,
                        material: product.material,
                        composition: product.composition,
                        imageUrl: product.imageUrl,
                        sizes: product.sizes || [],
                        colors: product.colors || [],
                        tags: product.tags || []
                    });

                    // Load images into FormArray
                    const imagesArray = this.form.get('images') as FormArray;
                    imagesArray.clear();
                    (product.images || []).forEach(img => {
                        imagesArray.push(this.fb.control(img, Validators.required));
                    });

                    this.setData(product);
                } else {
                    this.setError('Producto no encontrado');
                }
                this.setLoading(false);
            },
            error: (err) => {
                this.setError('Error al cargar el producto');
                this.setLoading(false);
            }
        });
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.markFormGroupTouched(this.form);
            return;
        }

        this.setLoading(true);
        const formValues = this.form.value;
        const id = formValues.id || crypto.randomUUID();

        const imagesArray = this.form.get('images') as FormArray;
        const images = imagesArray.value.filter((img: string) => img && img.trim());

        const product = new Product(
            id,
            formValues.name,
            formValues.price,
            formValues.stock,
            formValues.description,
            formValues.category,
            formValues.imageUrl,
            formValues.brand,
            formValues.gender,
            formValues.season,
            formValues.subcategory,
            formValues.material,
            formValues.composition,
            formValues.sizes,
            formValues.colors,
            images.length > 0 ? images : [formValues.imageUrl],
            formValues.tags || []
        );

        this.saveProductUseCase.execute(product).subscribe({
            next: () => {
                this.setLoading(false);
                this.router.navigate(['/inventory']);
            },
            error: (err) => {
                this.setError('Error al guardar el producto');
                this.setLoading(false);
            }
        });
    }

    public toggleSize(size: string): void {
        const control = this.form.get('sizes');
        const sizes = [...(control?.value || [])];
        const index = sizes.indexOf(size);
        if (index > -1) {
            sizes.splice(index, 1);
        } else {
            sizes.push(size);
        }
        control?.setValue(sizes);
        control?.markAsDirty();
        control?.markAsTouched();
        control?.updateValueAndValidity();
    }

    public toggleColor(color: string): void {
        const control = this.form.get('colors');
        const colors = [...(control?.value || [])];
        const index = colors.indexOf(color);
        if (index > -1) {
            colors.splice(index, 1);
        } else {
            colors.push(color);
        }
        control?.setValue(colors);
        control?.markAsDirty();
        control?.markAsTouched();
        control?.updateValueAndValidity();
    }

    public get imagesArray(): FormArray {
        return this.form.get('images') as FormArray;
    }

    public addImage(): void {
        this.imagesArray.push(this.fb.control('', Validators.required));
    }

    public removeImage(index: number): void {
        this.imagesArray.removeAt(index);
    }
}
