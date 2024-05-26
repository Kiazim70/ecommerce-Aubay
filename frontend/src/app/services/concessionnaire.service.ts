import { Injectable } from '@angular/core';
import { Concessionnaire } from '../model/concessionnaire';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface ConcessionnaireApiResponse {
  status: number;
  message: string;
  result: any;
}

@Injectable({
  providedIn: 'root'
})
export class ConcessionnaireService {
  
  getAllConcessionnaires(): Observable<Concessionnaire[]> {
    return this.http.get<Concessionnaire[]>(`${this.apiUrl}`+ '/allCon');
    }
  // getSelectedConcessionnaire(id: any): Observable<Concessionnaire[]> {
  //   return this.http.get<Concessionnaire[]>(`${this.apiUrl}`+ '/all');
  // }
  
  private apiUrl = 'http://localhost:8080/api/v1/concessionnaires';

  constructor(private http: HttpClient) { }

  searchConcessionnaires(searchTerm: string, pageIndex: number, pageSize: number) : Observable<Concessionnaire[]>{
  
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm);

    return this.http.get<Concessionnaire[]>(`${this.apiUrl}`+ '/all', { params });
}

getConcessionnaireById(id: number) : Observable<Concessionnaire> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Concessionnaire>(url).pipe(
    catchError((error: any) => {
      console.error('Error fetching concessionnaire by ID:', error);
      return throwError('Something went wrong while fetching the concessionnaire.');
    })
  );
}
  
saveConcessionnaire(concessionnaire: Concessionnaire) : Observable<ConcessionnaireApiResponse> {
  return this.http.post<ConcessionnaireApiResponse>(`${this.apiUrl}/add`, concessionnaire);
}

updateConcessionnaire(id: number, concessionnaire: any): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<any>(url, concessionnaire);
}

deleteConcessionnaire(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
}

}

export { Concessionnaire };
