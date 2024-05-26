
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { TranslateService } from './translation/translate.service';
import { Category } from '../model/category.model';
import { Car } from '../model/car.model';


  interface ResponseCarCategory {
    content: Category[];
  }

@Injectable({
  providedIn: 'root'
})
export class CarsService {


  searchByCategory(category_car_id: any , pageIndex: number, pageSize: number): Observable<Car[]> {
    const currentLanguage = this.translate.currentLanguage; // Récupérer la langue actuelle
    let params = new HttpParams()
      .set('category_car_id', category_car_id)
      .set('currentLanguage', currentLanguage)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Car[]>(`${this.apiUrl}/${category_car_id}}/searchByCategory`, { params });
  }

  
  // updateCar(id: number, invalid: boolean) {
  //   throw new Error('Method not implemented.');
  // }
  // updateCar(id: number, car: any): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put<any>(url, car);
  // }

  getAllProCars(): Observable<Car[]> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<Car[]>(this.apiUrl+"/all",{params: params} );
  }


  searchCar(id: number, searchTerm: string, pageIndex: number, pageSize: number): Observable<Car[]> {
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('id', id.toString())
      .set('searchTerm', searchTerm)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('currentLanguage', l);

    return this.http.get<Car[]>(`${this.apiUrl}/${id}/productCars`, { params }); 
   }


  private apiUrl = 'http://localhost:8080/api/v1/productcars';

  constructor(private http: HttpClient,
    private translate : TranslateService) { }

  searchCars(query: any): Observable<Car[]> {
    const l = this.translate.currentLanguage;
        let params = new HttpParams()
         .set('currentLanguage', l);
    
        return this.http.get<Car[]>(this.apiUrl+"/search?query="+query, { params }); 
   }
  
  searchCarsByCategory(category_car_id : any, searchTerm: any, pageIndex: number, pageSize: number) : Observable<Car[]>{
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('currentLanguage', l)
      .set('category_car_id', category_car_id)
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm);

    return this.http.get<Car[]>(`${this.apiUrl}/cars`, { params });
}

getAllProductCars(searchTerm: any, pageIndex: number, pageSize: number): Observable<Car[]> {
  const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('currentLanguage', l)
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm);
      return this.http.get<Car[]>(`${this.apiUrl}/productCars`, { params });
    } 

  getCarsByCategoryId(id: any , pageIndex: number, pageSize: number): Observable<Car[]> {
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
    .set('id', id)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('currentLanguage', l);

    return this.http.get<Car[]>(`${this.apiUrl}/${id}/products`, { params });
     
  }


  getCars(id: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
}


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
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }
  
  public addCar(car: FormData) {
    return this.http.post<Car>(this.apiUrl+"/all", car);
  }
 
  // addCar(car: Car) : Observable<Car> {
  //   return this.http.post<Car>(`${this.apiUrl}` + '/add', car);
  // }

  deleteCar(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getCarUnit(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
}

addToCart(carId: number, quantity: number): Observable<any> {
  const userId = localStorage.getItem('user_id');

  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  });
  return this.http.post<number>(`http://localhost:8080/api/v1/cart/${userId}/${carId}/${quantity}`, {}, { headers });
  }

  getCarCategories(): Observable<Category[]> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<ResponseCarCategory>(this.apiUrl+"/all",{params: params})
      .pipe(map(response => response.content));

  }
  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getImage(imageId: number) {
    return this.http.get(`${this.apiUrl}/${imageId}`, { responseType: 'blob' });
  }
}
