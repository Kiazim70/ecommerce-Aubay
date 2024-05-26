import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Model } from '../model/modeli.model';
import { TranslateService } from './translation/translate.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
 

  private apiUrl = 'http://localhost:8080/api/v1/models';


  constructor(private translate: TranslateService,
              private http : HttpClient ) { }


      getAllModelBrands(searchTerm: any, pageIndex: number, pageSize: number): Observable<Model[]> {
        const l = this.translate.currentLanguage;
        let params = new HttpParams()
          .set('currentLanguage', l)
          .set('page', pageIndex.toString())
          .set('size', pageSize.toString())
          .set('searchTerm', searchTerm);
        
    return this.http.get<Model[]>(`${this.apiUrl}/allModels`, { params });
      }

      deleteModel(id: number) {
        return this.http.delete(`${this.apiUrl}/delete/${id}`);
      }
      addModel(formData: FormData): Observable<Model> {
        // Ajoutez le paramètre de langue à la requête s'il est nécessaire
        const l = this.translate.currentLanguage; 
        let params = new HttpParams().set('currentLanguage', l);
    
        // Effectuez la requête POST avec FormData comme corps de la requête
        return this.http.post<Model>(`${this.apiUrl}/addModels`, formData, { params });
      }

      getModelById(id: number): Observable<Model> {
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
      
      updateModel(id: number, formData: FormData): Observable<any> {
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

      searchModelByBrand(brand_id : any, searchTerm: any, pageIndex: number, pageSize: number) : Observable<Model[]>{
        const l = this.translate.currentLanguage;
        let params = new HttpParams()
          .set('currentLanguage', l)
          .set('brand_id', brand_id)
          .set('page', pageIndex.toString())
          .set('size', pageSize.toString())
          .set('searchTerm', searchTerm);
    
        return this.http.get<Model[]>(`${this.apiUrl}/modelux`, { params });
    }

    getModelUnit(id: any): Observable<any> {
      
      return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  }
  // addToCart(modelId: number, quantity: number): Observable<any> {
  //   const userId = localStorage.getItem('user_id');

  //   const headers = new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('access_token')
  //   });

  //   return this.http.post<number>(`http://localhost:8080/api/v1/cart/${userId}/${modelId}/${quantity}`, {}, { headers });
  // }

