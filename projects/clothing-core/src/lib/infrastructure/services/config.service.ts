import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from './security.service';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
    apiUrl: string;
    env: string;
    version: string;
    production: boolean;
    security?: {
        encryptionKey: string;
        sessionTimeout: number;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private http = inject(HttpClient);
    private security = inject(SecurityService);
    private config = signal<AppConfig | null>(null);
    private readonly CONFIG_API = 'http://localhost:3000/config';

    getConfig() {
        return this.config();
    }

    async loadConfig(): Promise<void> {
        try {
            const config = await firstValueFrom(this.http.get<AppConfig>(this.CONFIG_API));

            // Simulación de desencriptación de valores sensibles (Punto 09)
            if (config.security?.encryptionKey) {
                const decryptedKey = this.security.decrypt(config.security.encryptionKey);
                console.log(`[ConfigService] Decrypted security key: ${decryptedKey}`);
                config.security.encryptionKey = decryptedKey;
            }

            this.config.set(config);
            console.log('[ConfigService] Configuration loaded from backend');
        } catch (error) {
            console.error('[ConfigService] Failed to load config from backend, using defaults', error);
            this.config.set({
                apiUrl: 'https://fakestoreapi.com',
                env: 'local',
                version: '1.0.0-fallback',
                production: false
            });
        }
    }
}
