import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    sanitizeHtml(input: string): string {
        if (!input) return '';
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }


    sanitizeObject(obj: any): any {
        if (typeof obj !== 'object' || obj === null) return obj;

        const sanitized: any = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                sanitized[key] = this.sanitizeHtml(obj[key]);
            } else {
                sanitized[key] = this.sanitizeObject(obj[key]);
            }
        }
        return sanitized;
    }


    encrypt(data: string): string {
        return btoa(data);
    }

    decrypt(data: string): string {
        try {
            return atob(data);
        } catch (e) {
            return data;
        }
    }
}
