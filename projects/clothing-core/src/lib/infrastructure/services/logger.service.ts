import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 4
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private http = inject(HttpClient);
    private currentLevel = signal<LogLevel>(LogLevel.DEBUG);
    private readonly LOGS_API = 'http://localhost:3000/logs';

    setLevel(level: LogLevel) {
        this.currentLevel.set(level);
    }

    private persistLog(level: string, message: string, data?: any) {
        const logEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
            userAgent: navigator.userAgent
        };

        // Fire and forget (optional: handle error silently)
        this.http.post(this.LOGS_API, logEntry).subscribe();
    }

    debug(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${msg}`, ...args);
            this.persistLog('DEBUG', msg, args);
        }
    }

    info(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.INFO) {
            console.info(`[INFO] ${msg}`, ...args);
            this.persistLog('INFO', msg, args);
        }
    }

    warn(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.WARN) {
            console.warn(`[WARN] ${msg}`, ...args);
            this.persistLog('WARN', msg, args);
        }
    }

    error(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.ERROR) {
            console.error(`[ERROR] ${msg}`, ...args);
            this.persistLog('ERROR', msg, args);
        }
    }
}
