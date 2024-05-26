import { Injectable } from '@angular/core';
import { Brand } from '../model/brand.model';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TranslateService } from './translation/translate.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {



  private apiUrl = 'http://localhost:8080/api/v1/brand';


  constructor(private translate: TranslateService,
              private http: HttpClient ) { }

  getAllBrands(): Observable<Brand[]> {
    const currentLanguage = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', currentLanguage);
    return this.http.get<Brand[]>(`${this.apiUrl}/all`, { params });
    
  }

  addBrands(formData: FormData): Observable<any> {
    // Ajoutez le paramètre de langue à la requête s'il est nécessaire
    const l = this.translate.currentLanguage; 
    let params = new HttpParams().set('currentLanguage', l);

    // Effectuez la requête POST avec FormData comme corps de la requête
    return this.http.post<any>(`${this.apiUrl}/addBrands`, formData, { params });
  }

  getBrandsById(id: number) : Observable<Brand> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<Brand>(`${this.apiUrl}/brandes/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }

  updateBrands(id: number, formData: FormData) : Observable<any> {
    const l = this.translate.currentLanguage; // Assuming translate is properly initialized
    const params = new HttpParams().set('currentLanguage', l);
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData, { params })
      .pipe(
        catchError(error => {
          // Handle errors here, you can log them or perform any specific error handling
          console.error('An error occurred:', error);
          // Returning a new observable with a default value or error response
          return of({ error });
        })
      ); 
  }

  deleteBrands(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
