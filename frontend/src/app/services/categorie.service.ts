import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from './translation/translate.service';
import { Category } from '../model/categorie.model';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
 


  private apiUrl = 'http://localhost:8080/api/v1/category';

 
  constructor(private http:HttpClient,
              private translate : TranslateService) { }


  getAllCategories(): Observable<Category[]> {
    const currentLanguage = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', currentLanguage);
    return this.http.get<Category[]>(`${this.apiUrl}/all`, { params });
    
  }

  deleteCategorie (id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
}

addCategorie(formData: FormData): Observable<any> {
  // Ajoutez le paramètre de langue à la requête s'il est nécessaire
  const l = this.translate.currentLanguage; 
  let params = new HttpParams().set('currentLanguage', l);

  // Effectuez la requête POST avec FormData comme corps de la requête
  return this.http.post<any>(`${this.apiUrl}/addCategorieImg`, formData, { params });
}

getCategoryById(id: number): Observable<Category> {
  const l = this.translate.currentLanguage;
  const params = new HttpParams().set('currentLanguage', l);
  return this.http.get<Category>(`${this.apiUrl}/categories/${id}`, {params: params}).pipe(
    catchError((error: any) => {
      console.error('Error fetching customer by ID:', error);
      return throwError('Something went wrong while fetching the customer.');
    })
  );
}

updateCategory(id: number, formData: FormData): Observable<any> {
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
}
