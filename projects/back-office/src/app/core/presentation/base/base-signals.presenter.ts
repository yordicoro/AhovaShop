import { signal, computed } from '@angular/core';
import { BasePresenter } from './base.presenter';

export abstract class BasePresenterWithSignals<T> extends BasePresenter {
    // Signals de estado básico
    private readonly _loading = signal<boolean>(false);
    private readonly _error = signal<string | null>(null);
    private readonly _data = signal<T | null>(null);

    // Readonly computed para exposición pública
    readonly loading = computed(() => this._loading());
    readonly error = computed(() => this._error());
    readonly data = computed(() => this._data());
    readonly isEmpty = computed(() => {
        const currentData = this._data();
        if (Array.isArray(currentData)) {
            return currentData.length === 0;
        }
        return currentData === null || currentData === undefined;
    });

    public constructor() {
        super();
    }

    public setLoading(value: boolean): void {
        this._loading.set(value);
        if (value) this.setError(null);
    }

    public setError(message: string | null): void {
        this._error.set(message);
        if (message) this._loading.set(false);
    }

    public setData(data: T): void {
        this._data.set(data);
        this._loading.set(false);
        this._error.set(null);
    }

    /**
     * Helper para depurar cambios en signals si es necesario
     */
    protected debugSignals(): void {
        this.log('Signal State:', {
            loading: this.loading(),
            error: this.error(),
            data: this.data(),
            isEmpty: this.isEmpty()
        });
    }
}
