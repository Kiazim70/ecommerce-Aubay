import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';
import { query } from '@angular/animations';



export interface CustomerApiResponse {
  status: number;
  message: string;
  result: any;
}
export interface PagingConfig{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
export interface ProductApiResponse {
  status: number;
  message: string;
  result: any;
}


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/v1/customers';

 
  constructor(private http:HttpClient) { }


  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer by ID:', error);
        return throwError('Something went wrong while fetching the customer.');
      })
    );
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, customer);
  }
  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/add`, customer);
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/all`);
  }
  searchCustomers(searchTerm: string, pageIndex: number, pageSize: number) : Observable<Customer[]>{
  
      let params = new HttpParams()
        .set('page', pageIndex.toString())
        .set('size', pageSize.toString())
        .set('searchTerm', searchTerm);
  
      return this.http.get<Customer[]>(`${this.apiUrl}`+ '/all', { params });
  }
    
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
