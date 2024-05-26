import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public headers!: HttpHeaders;
  public RQSTOptions: any;

  constructor(private http: HttpClient) {
    this.setHeader();
  }

  setHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.RQSTOptions = {
      headers: this.headers,
      responseType: 'json'
    };
  }

  getComments(): Observable<any> {
    const apiURL = `${environment.apiEndpointComments}`;
    return this.http.get<any>(apiURL, this.RQSTOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPhotos(): Observable<any> {
    const apiURL = `${environment.apiEndpointPhotos}`;
    return this.http.get<any>(apiURL, this.RQSTOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
