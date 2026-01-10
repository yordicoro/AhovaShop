import { Injectable, signal } from '@angular/core';

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
    private currentLevel = signal<LogLevel>(LogLevel.DEBUG);

    setLevel(level: LogLevel) {
        this.currentLevel.set(level);
    }

    debug(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${msg}`, ...args);
        }
    }

    info(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.INFO) {
            console.info(`[INFO] ${msg}`, ...args);
        }
    }

    warn(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.WARN) {
            console.warn(`[WARN] ${msg}`, ...args);
        }
    }

    error(msg: string, ...args: any[]) {
        if (this.currentLevel() <= LogLevel.ERROR) {
            console.error(`[ERROR] ${msg}`, ...args);
        }
    }
}
