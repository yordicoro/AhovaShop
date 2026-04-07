export abstract class BasePresenter {
    public constructor() {
        this.initLogging();
    }

    private initLogging(): void {
        if (this.debugMode) {
            console.log(`[Presenter Init]: ${this.constructor.name}`);
        }
    }

    protected get debugMode(): boolean {
        return true;
    }

    protected log(message: string, ...data: any[]): void {
        if (this.debugMode) {
            console.log(`[${this.constructor.name}]: ${message}`, ...data);
        }
    }

    public trackById(index: number, item: any): any {
        return item.id || index;
    }
}
