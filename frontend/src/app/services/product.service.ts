import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { query } from '@angular/animations';
import { __values } from 'tslib';
import { TranslateService } from './translation/translate.service';


export interface Product {

  id: number;
  locale: string;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductApiResponse {
  status: number;
  message: string;
  result: any;
}

export interface Langue {
  id: number;
  title: string;
}

export interface PagingConfig{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchedProducts(searchTerm: string, pageIndex: number, pageSize: number) : Observable<Product[]>{
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('currentLanguage', l);

    return this.http.get<Product[]>(`${this.apiUrl}`+ '/all', { params });
 
  }
 
  private apiUrl = 'http://localhost:8080/api/v1/products';
  
  getProductById(id: number): Observable<Product> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams()
    .set('currentLanguage', l);
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching product by ID:', error);
        return throwError('Something went wrong while fetching the product.');
      })
    );
  }

//   searchingProducts(category_id: any, searchTerm: string, pageIndex: number, pageSize: number) : Observable<Product[]>{
//     const l = this.translate.currentLanguage;
//     let params = new HttpParams()
//       .set('page', pageIndex.toString())
//       .set('size', pageSize.toString())
//       .set('category_id', category_id)
//       .set('searchTerm', searchTerm)
//       .set('currentLanguage', l);

//     return this.http.get<Product[]>(`${this.apiUrl}`+ '/allProducts', { params });
// }
  
  
  getSelectedCategoryLanguage(): Observable<any> {
    const l = this.translate.currentLanguage;
      console.log("ceci est une langue" + l);
  
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<any>(`${this.apiUrl}/{categoryId}/products`, {params: params})
  }

  
  getCarsList(categoryId: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${categoryId}/products`);
  }

  getSelectedLanguage(): Observable<any> {
    const l = this.translate.currentLanguage;
      console.log("ceci est une langue" + l);
  
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<any>(`${this.apiUrl}/all`, {params: params})
  }

  sendSelectedLanguage(currentLang: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}` + '/add', { language: currentLang })
  }

 
  getProductsList(categoryId: string, searchTerm: string, pageIndex: number, pageSize: number): Observable<any> {
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('page', pageIndex)
      .set('size', pageSize)
      .set('category', categoryId)
      .set('currentLanguage', l);
    if( searchTerm != "") {
      console.log("if ok");
      params.set('query', searchTerm);
    }
    return this.http.get(`${this.apiUrl}/{categoryId}/products`, { params });
  }
 
  getProducts(): Observable<Product[] >{
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<Product[]>(`${this.apiUrl}` + '/all', {params: params});
  }
 
  // updateProduct(id: number, product: Product): Observable<Object> {
  //   return this.http.put(`${this.apiUrl}/${id}`, product);
  // }
  updateProduct(id: number, formData: FormData) {
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData, { params }).pipe(
      catchError(error => {
        // Handle errors here, you can log them or perform any specific error handling
        console.error('An error occurred:', error);
        // Returning a new observable with a default value or error response
        return of({ error });
      })
    );   }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  fetchProductByidFromRemote(_productId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}` + '/productId'); 
  }
  
 
  getAllProducts(): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(`${this.apiUrl}` + '/all');    
  }
 
  
  addProduct(formData: FormData): Observable<any> {
    // Ajoutez le paramètre de langue à la requête s'il est nécessaire
    const l = this.translate.currentLanguage; 
    let params = new HttpParams().set('currentLanguage', l);

    // Effectuez la requête POST avec FormData comme corps de la requête
    return this.http.post<any>(`${this.apiUrl}/addProductImg`, formData, { params });
  }
  searchProducts(query:string): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/search?query="+query);
  }
  
  searchdetails(query: string) {
    return this.http.get<Array<Product>>(`${this.apiUrl}`+"/search?query="+query);
  }  

  constructor(private http: HttpClient,
    private translate: TranslateService) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    const userId = localStorage.getItem('user_id');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post<number>(`http://localhost:8080/api/v1/cart/${userId}/${productId}/${quantity}`, {}, { headers });
  }

  create(data: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }
  search() : Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.apiUrl}`+"/search?query="+query);
  }
  searchProduct(query: any): Observable<any> {
    return this.http.get<Array<Product>>(`${this.apiUrl}`+"/search?query="+query);
  }
  // getProductList(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/allProdList`);  }
    
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

}
