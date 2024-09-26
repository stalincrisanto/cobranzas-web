import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Client } from '../models/client.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:5125/api/clients';

  constructor(private http: HttpClient) {}

  getClientById(idClient: string): Observable<Client | null> {
    const url = `${this.apiUrl}/${idClient}`;
    return this.http.get<Client>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(
        () => new Error('El cliente no se encuentra en la base de datos.')
      );
    } else {
      return throwError(
        () =>
          new Error(
            'Ha ocurrido un error inesperado. Por favor, intenta más tarde.'
          )
      );
    }
  }
}
