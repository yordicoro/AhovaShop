import { FormGroup } from '@angular/forms';
import { BasePresenterWithSignals } from './base-signals.presenter';
import { Signal, inject, DestroyRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

export abstract class BaseFormPresenter<T, R = void> extends BasePresenterWithSignals<T> {
    abstract form: FormGroup;
    protected destroyRef = inject(DestroyRef);

    private _isValid?: Signal<boolean>;

    /**
     * Signal reactive que indica si el formulario es válido.
     */
    public get isValid(): Signal<boolean> {
        if (!this._isValid) {
            throw new Error('Form validation signal not initialized. Call initializeFormSignals() in the constructor after form initialization.');
        }
        return this._isValid;
    }

    /**
     * Inicializa las señales reactivas del formulario.
     * Debe llamarse en el constructor de la clase hija DESPUÉS de inicializar `this.form`.
     */
    protected initializeFormSignals(): void {
        this._isValid = toSignal(
            this.form.statusChanges.pipe(
                map(status => status === 'VALID'),
                startWith(this.form.valid)
            ),
            { initialValue: this.form.valid }
        ) as Signal<boolean>;
    }

    // Estado de envío
    public readonly isSubmitting = this.loading;

    public constructor() {
        super();
    }

    /**
     * Procesa el envío del formulario
     */
    public abstract onSubmit(): void;

    /**
     * Resetea el formulario
     */
    public reset(): void {
        this.form.reset();
        this.setError(null);
        this.setLoading(false);
    }

    /**
     * Marca todos los campos como tocados para mostrar errores
     */
    protected markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if ((control as any).controls) {
                this.markFormGroupTouched(control as FormGroup);
            }
        });
    }
}
