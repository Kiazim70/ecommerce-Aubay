import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Rentcar } from '../model/rentcar.model';
import { Model } from '../model/modeli.model';
import { TranslateService } from './translation/translate.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RentcarService {

  private apiUrl = 'http://localhost:8080/api/v1/models';

  constructor(private translate: TranslateService,
              private http: HttpClient
  ) { }

  
  getRentcarById(id: any): Observable<Model> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams()
    .set('currentLanguage', l);
    return this.http.get<Model>(`${this.apiUrl}/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }

}
