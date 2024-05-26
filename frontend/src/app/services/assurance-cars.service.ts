import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssuranceCars } from '../model/assurancecars.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateService } from './translation/translate.service';

@Injectable({
  providedIn: 'root'
})
export class AssuranceCarsService {
  
  getAll(): Observable <AssuranceCars[]>{
    const l = this.translate.currentLanguage;
    const params = new HttpParams().set('currentLanguage', l);
    return this.http.get<AssuranceCars[]>(this.apiUrl+"/all",{params: params});
      }
  
  private apiUrl = 'http://localhost:8080/api/v1/assurancecars';

  constructor(private translate : TranslateService,
              private http : HttpClient
  ) { }

  addAssuranceCars(formData: FormData) : Observable<any> {
    // Ajoutez le paramètre de langue à la requête s'il est nécessaire
    const l = this.translate.currentLanguage; 
    let params = new HttpParams().set('currentLanguage', l);

    // Effectuez la requête POST avec FormData comme corps de la requête
    return this.http.post<any>(`${this.apiUrl}/addAssuranceCarsImg`, formData, { params });
  }
}