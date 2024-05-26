import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Category } from '../model/category.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateService } from './translation/translate.service';
import { Car } from '../model/car.model';

interface ApiResponseCar {
  content: Car[];
  totalPages: number;
  size: number;
  totalElements: number,
  number: number,
  first: boolean,
  last: boolean,
  empty: boolean;

}

interface ResponseCarCategory {
  content: Category[];
}

export interface CarApiResponse {
  status: number;
  message: string;
  result: any;
}


@Injectable({
  providedIn: 'root'
})
export class CarService {
 
  updateCar(id: number, formData: FormData): Observable<any> {
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

  getCarById(id: number): Observable<Car> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams()
    .set('currentLanguage', l);
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }

  addCar(formData: FormData): Observable<any> {
    // Ajoutez le paramètre de langue à la requête s'il est nécessaire
    const l = this.translate.currentLanguage; 
    let params = new HttpParams().set('currentLanguage', l);

    // Effectuez la requête POST avec FormData comme corps de la requête
    return this.http.post<any>(`${this.apiUrl}/addCarImg`, formData, { params });
  }
  

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.apiUrl+"/image", formData);
  }

  getCarListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<ApiResponseCar> {

    const searchUrl = `${ this.apiUrl }/search/category?id=${ theCategoryId }`
      + `&page=${ thePage }&size=${ thePageSize }`;

    return this.http.get<ApiResponseCar>(searchUrl)
      .pipe(map(response => response));
  }


  searchCarsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<ApiResponseCar> {

    const searchUrl = `${this.apiUrl}?name=${ theKeyword }`
      + `&page=${ thePage }&size=${ thePageSize }`;

    return this.http.get<ApiResponseCar>(searchUrl)
      .pipe(map(response => response));
  }

 

  private apiUrl = 'http://localhost:8080/api/v1/productcars';

 

  constructor(private http: HttpClient,
              private translate : TranslateService
  ) { }

  getCarCategories(): Observable<Category[]> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<ResponseCarCategory>(this.apiUrl+"/all",{params: params})
      .pipe(map(response => response.content));

  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>('${this.apiUrl}', formData, { headers: headers });
  }
}
