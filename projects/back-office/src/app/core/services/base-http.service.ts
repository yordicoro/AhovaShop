import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiType, BaseConfigService } from './base-config.service';

export abstract class BaseHttpService {
    protected http = inject(HttpClient);
    private config = inject(BaseConfigService);

    protected constructor(private apiType: ApiType, private endpoint: string) { }

    private get baseUrl(): string {
        return `${this.config.getApiUrl(this.apiType)}/${this.endpoint}`;
    }

    protected get<T>(path: string = '', params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${path}`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    protected post<T>(data: any, path: string = ''): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${path}`, data).pipe(
            catchError(this.handleError)
        );
    }

    protected put<T>(data: any, path: string = ''): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${path}`, data).pipe(
            catchError(this.handleError)
        );
    }

    protected delete<T>(path: string = ''): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${path}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error inesperado';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
