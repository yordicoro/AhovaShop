import { Injectable, signal } from '@angular/core';

export interface AppConfig {
    apiUrl: string;
    env: string;
    version: string;
    production: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config = signal<AppConfig | null>(null);

    getConfig() {
        return this.config();
    }

    loadConfig(): Promise<void> {
        // Simulating fetching config from a local file or environment
        return new Promise((resolve) => {
            const mockConfig: AppConfig = {
                apiUrl: 'https://fakestoreapi.com',
                env: 'dev',
                version: '1.0.0-luxe',
                production: false
            };

            setTimeout(() => {
                this.config.set(mockConfig);
                console.log('[ConfigService] Configuration loaded');
                resolve();
            }, 500);
        });
    }
}
