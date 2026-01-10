import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppNotification {
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    // Pub/Sub pattern using RxJS Subject (Point 06)
    private notificationSubject = new Subject<AppNotification>();
    notifications$ = this.notificationSubject.asObservable();

    // Modern state management using signals
    activeNotification = signal<AppNotification | null>(null);

    notify(notification: AppNotification) {
        this.notificationSubject.next(notification);
        this.activeNotification.set(notification);

        if (notification.duration !== 0) {
            setTimeout(() => {
                if (this.activeNotification() === notification) {
                    this.activeNotification.set(null);
                }
            }, notification.duration || 3000);
        }
    }

    success(message: string) {
        this.notify({ message, type: 'success' });
    }

    error(message: string) {
        this.notify({ message, type: 'error' });
    }
}
