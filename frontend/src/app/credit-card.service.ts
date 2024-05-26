import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CreditCard } from './model/creditcard.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateService } from './services/translation/translate.service';


export interface CreditCardApiResponse {
  status: number;
  message: string;
  result: any;
}

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
 
  

  private apiUrl = 'http://localhost:8080/api/v1/creditCards';

  constructor (private http : HttpClient,
               private translate : TranslateService
  ) {}

  
  saveCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(`${this.apiUrl}/add`, creditCard);
  }


  deleteCreditCard(id: number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getAllCreditCards(searchTerm: any, pageIndex: number, pageSize: number) : Observable<CreditCard[]>{
    //const l = this.translate.currentLanguage;
    let params = new HttpParams()
      //.set('currentLanguage', l)
      //.set('customer_id', customer_id)
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm);

    return this.http.get<CreditCard[]>(`${this.apiUrl}`+ '/all', { params });
}

  updateCreditCard(id: number, creditCard: CreditCard): Observable<any> {
    const l = this.translate.currentLanguage; // Assuming translate is properly initialized
    const params = new HttpParams().set('currentLanguage', l);
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, creditCard, { params })
      .pipe(
        catchError(error => {
          // Handle errors here, you can log them or perform any specific error handling
          console.error('An error occurred:', error);
          // Returning a new observable with a default value or error response
          return of({ error });
        })
      ); 
  }
  getCreditCardById(id: number): Observable<CreditCard> {
    const l = this.translate.currentLanguage;
    const params = new HttpParams()
    .set('currentLanguage', l);
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`, {params: params}).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }
}
