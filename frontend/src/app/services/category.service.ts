import { Injectable } from '@angular/core';
import { Observable, Observer, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateService } from './translation/translate.service';
import { Category } from '../model/category.model';

export interface CategoryCar {
  id: number;
  locale: string;
  name: string;
  image: string;
  price: string;
}

export interface CategoryApiResponse {
  status: number;
  message: string;
  result: any;
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  


  private apiUrl = 'http://localhost:8080/api/v1/categoryCar';

 
  constructor(private http:HttpClient,
              private translate : TranslateService) { }

              // Services to Api

              getAllCategories(): Observable<Category[]> {
                const currentLanguage = this.translate.currentLanguage;
                const params = new HttpParams().set('currentLanguage', currentLanguage);
                return this.http.get<Category[]>(`${this.apiUrl}/all`, { params });
                
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
                     
              // getCategoryById(id: number): Observable<any> {
              //   return this.http.get<any>(`${this.apiUrl}/categories/${id}`);
              // }
 
              addCategory(formData: FormData): Observable<any> {
                // Ajoutez le paramètre de langue à la requête s'il est nécessaire
                const l = this.translate.currentLanguage; 
                let params = new HttpParams().set('currentLanguage', l);
            
                // Effectuez la requête POST avec FormData comme corps de la requête
                return this.http.post<any>(`${this.apiUrl}/addCategory`, formData, { params });
              }
              
              deleteCategory (id: number) {
                    return this.http.delete(`${this.apiUrl}/delete/${id}`);
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


//   getCategory(id: any): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/categories/${id}`).pipe(
//       catchError(error => {
//         console.error('Une erreur s\'est produite lors de la récupération de la catégorie : ', error);
//         throw error; // Renvoyer l'erreur pour qu'elle soit gérée par le composant appelant
//       })
//     );
//   } 
//   // getCategory(id: any): Observable<any> {
//   //   return this.http.get<any>(`${this.apiUrl}/categories/${id}`);
//   // }

//   getProductsByCategory(categoryId: number): Observable<Category[]> {
//     return this.http.get<Category[]>(`${this.apiUrl}/${categoryId}/products`);
//   }

//   addCategory(category: Category, currentLanguage: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/add`, category, { headers: { 'Accept-Language': currentLanguage } }).pipe(
//       catchError(error => {
//         // Handle errors here, you can log them or perform any specific error handling
//         console.error('An error occurred:', error);
//         // Returning a new observable with a default value or error response
//         return of({ error });
//       })
//     );
//   }

//   getAllCategories(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/all`)
//      .pipe(
//       catchError(error => {
//         console.error('Une erreur s\'est produite lors de la récupération des catégories : ', error);
//         throw error;
//       })
//     );
//   }

//   getSelectedLanguage(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/all`, { params: this.createParams() }).pipe(
//       tap(data => {
//         console.log("Langue sélectionnée :", data);
//         // Effectuez ici d'autres opérations si nécessaire avec les données reçues
//       })
//     );
//   }
  
//   private createParams(): HttpParams {
//     const l = this.translate.currentLanguage;
//     console.log("Langue actuelle :", l);
//     return new HttpParams().set('currentLanguage', l);
//   }


