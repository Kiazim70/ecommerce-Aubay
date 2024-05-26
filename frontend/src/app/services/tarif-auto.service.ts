import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TranslateService } from './translation/translate.service';
import { TarifAuto } from '../model/tarifauto.model';

@Injectable({
  providedIn: 'root'
})
export class TarifAutoService {

  private apiUrl = 'http://localhost:8080/api/v1/tarifAutos';


  constructor(private translate : TranslateService,
              private http : HttpClient) { 

              }

      getAllTarifsAuto(searchTerm: any, pageIndex: number, pageSize: number): Observable<TarifAuto[]> {
        const l = this.translate.currentLanguage;
        let params = new HttpParams()
        .set('currentLanguage', l)
        .set('page', pageIndex.toString())
        .set('size', pageSize.toString())
        .set('searchTerm', searchTerm);
        return this.http.get<TarifAuto[]>(`${this.apiUrl}/tarifedautos`, { params });
      } 

      saveTarifAuto(tarifAuto: TarifAuto): Observable<TarifAuto> {
        const l = this.translate.currentLanguage; 
        let params = new HttpParams().set('currentLanguage', l);
        return this.http.post<TarifAuto>(`${this.apiUrl}/add`, tarifAuto, { params });
      }

      updateTarifAuto(id: number, tarifAuto: any) : Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<any>(url, tarifAuto); 
      }

      
      // getTarifAutoById(id: number): Observable<TarifAuto> {
      //   const url = `${this.apiUrl}/${id}`;
      //   return this.http.get<TarifAuto>(url).pipe(
      //     catchError((error: any) => {
      //       console.error('Error fetching tarifAuto by ID:', error);
      //       return throwError('Something went wrong while fetching the tarifAuto.');
      //     })
      //   );
      // }
      getTarifAutoById(id: number): Observable<TarifAuto> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<TarifAuto>(url).pipe(
          catchError((error: any) => {
            console.error('Error fetching customer by ID:', error);
            return throwError('Something went wrong while fetching the customer.');
          })
        );
      }

      deleteTarifAuto(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`);
     }
}


