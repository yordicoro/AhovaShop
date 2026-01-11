import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductFormPresenter } from '../../presenter/product-form.presenter';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [ProductFormPresenter],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">
            {{ presenter.isEditMode ? 'Editar Producto' : 'Nuevo Producto' }}
          </h1>
          <p class="text-slate-500 font-medium mt-1">Complete todos los campos para agregar un producto al catálogo</p>
        </div>

        @if (presenter.loading()) {
          <div class="flex justify-center items-center py-20">
            <div class="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          </div>
        } @else {
          <form [formGroup]="presenter.form" (ngSubmit)="presenter.onSubmit()" class="space-y-6">
            
            <!-- Información Básica -->
            <div class="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">1</span>
                Información Básica
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nombre del Producto *</label>
                  <input type="text" formControlName="name" 
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                  @if (presenter.form.get('name')?.invalid && presenter.form.get('name')?.touched) {
                    <p class="text-xs text-red-600 mt-1 font-medium">Ingrese un nombre válido (mín. 3 caracteres)</p>
                  }
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Marca *</label>
                  <input type="text" formControlName="brand" 
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Precio (USD) *</label>
                  <input type="number" formControlName="price" step="0.01"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Descripción *</label>
                  <textarea formControlName="description" rows="3"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Clasificación -->
            <div class="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">2</span>
                Clasificación
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Categoría *</label>
                  <select formControlName="category"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all bg-white">
                    <option value="">Seleccionar...</option>
                    <option value="men's clothing">Ropa de Hombre</option>
                    <option value="women's clothing">Ropa de Mujer</option>
                    <option value="electronics">Electrónica</option>
                    <option value="jewelery">Joyería</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subcategoría</label>
                  <input type="text" formControlName="subcategory" placeholder="Ej: Camisetas, Pantalones..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Género *</label>
                  <select formControlName="gender"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all bg-white">
                    <option value="">Seleccionar...</option>
                    @for (opt of presenter.genderOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Temporada</label>
                  <select formControlName="season"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all bg-white">
                    <option value="">Seleccionar...</option>
                    @for (opt of presenter.seasonOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
              </div>
            </div>

            <!-- Materiales -->
            <div class="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">3</span>
                Materiales y Composición
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Material Principal</label>
                  <input type="text" formControlName="material" placeholder="Ej: Algodón, Poliéster..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Composición</label>
                  <input type="text" formControlName="composition" placeholder="Ej: 80% Algodón, 20% Poliéster"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>
              </div>
            </div>

            <!-- Tallas Disponibles -->
            @if (presenter.showSizing) {
              <div class="bg-white rounded-2xl border border-slate-200 p-8">
                <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">4</span>
                  Tallas Disponibles *
                </h2>
                
                <div class="flex flex-wrap gap-3">
                  @for (size of presenter.availableSizes; track size) {
                    <button type="button" 
                      (click)="presenter.toggleSize(size)"
                      [class.bg-slate-900]="isSelected('sizes', size)"
                      [class.text-white]="isSelected('sizes', size)"
                      [class.bg-slate-100]="!isSelected('sizes', size)"
                      [class.text-slate-600]="!isSelected('sizes', size)"
                      class="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 border-2"
                      [class.border-slate-900]="isSelected('sizes', size)"
                      [class.border-slate-200]="!isSelected('sizes', size)">
                      {{ size }}
                    </button>
                  }
                </div>
              </div>

              <!-- Colores Disponibles -->
              <div class="bg-white rounded-2xl border border-slate-200 p-8">
                <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">5</span>
                  Colores Disponibles *
                </h2>
                
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                  @for (color of presenter.availableColors; track color.value) {
                    <button type="button"
                      (click)="presenter.toggleColor(color.value)"
                      [class.ring-4]="isSelected('colors', color.value)"
                      [class.ring-slate-900]="isSelected('colors', color.value)"
                      class="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95"
                      [class.border-slate-900]="isSelected('colors', color.value)"
                      [class.border-slate-200]="!isSelected('colors', color.value)">
                      <div class="w-12 h-12 rounded-full border-2 border-slate-200" [style.background-color]="color.hex"></div>
                      <span class="text-xs font-bold text-slate-700">{{ color.value }}</span>
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Stock e Imágenes -->
            <div class="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">6</span>
                Stock e Imágenes
              </h2>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Stock Total *</label>
                  <input type="number" formControlName="stock" min="0"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Imagen Principal (URL) *</label>
                  <input type="url" formControlName="imageUrl" placeholder="https://..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                </div>

                <div>
                  <div class="flex items-center justify-between mb-3">
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Imágenes Adicionales</label>
                    <button type="button" (click)="presenter.addImage()"
                      class="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                      + Añadir Imagen
                    </button>
                  </div>
                  
                  @for (control of presenter.imagesArray.controls; track $index; let i = $index) {
                    <div class="flex gap-2 mb-2">
                      <input type="url" [formControl]="$any(control)" placeholder="https://..."
                        class="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 outline-none transition-all">
                      <button type="button" (click)="presenter.removeImage(i)"
                        class="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all">
                        ×
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 justify-end pt-6">
              <button type="button" routerLink="/inventory"
                class="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase text-sm tracking-wider hover:bg-slate-200 transition-all">
                Cancelar
              </button>
              <button type="submit" [disabled]="presenter.isSubmitting() || !presenter.isValid()"
                class="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold uppercase text-sm tracking-wider hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (presenter.isSubmitting()) {
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Guardando...
                  </div>
                } @else {
                  {{ presenter.isEditMode ? 'Actualizar' : 'Crear' }} Producto
                }
              </button>
            </div>

          </form>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ProductFormPage implements OnInit {
  protected presenter = inject(ProductFormPresenter);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.presenter.loadProduct(id);
    }
  }

  protected isSelected(controlName: string, value: string): boolean {
    const values = this.presenter.form.get(controlName)?.value || [];
    return values.includes(value);
  }
}
