import { FormGroup } from '@angular/forms';
import { BasePresenterWithSignals } from './base-signals.presenter';
import { Signal, inject, DestroyRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

export abstract class BaseFormPresenter<T, R = void> extends BasePresenterWithSignals<T> {
    abstract form: FormGroup;
    protected destroyRef = inject(DestroyRef);

    private _isValid?: Signal<boolean>;

    public get isValid(): Signal<boolean> {
        if (!this._isValid) {
            throw new Error('Form validation signal not initialized. Call initializeFormSignals() in the constructor after form initialization.');
        }
        return this._isValid;
    }

    protected initializeFormSignals(): void {
        this._isValid = toSignal(
            this.form.statusChanges.pipe(
                map(status => status === 'VALID'),
                startWith(this.form.valid)
            ),
            { initialValue: this.form.valid }
        ) as Signal<boolean>;
    }

    public readonly isSubmitting = this.loading;

    public constructor() {
        super();
    }

    public abstract onSubmit(): void;

    public reset(): void {
        this.form.reset();
        this.setError(null);
        this.setLoading(false);
    }

    protected markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if ((control as any).controls) {
                this.markFormGroupTouched(control as FormGroup);
            }
        });
    }
}
