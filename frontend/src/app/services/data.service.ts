import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8080/api/v1/products';

  private selectedLanguage: string = 'en'; // Default language

  constructor(private http: HttpClient) { }

  setSelectedLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  sendSelectedLanguageToBackend(lang: string) {
    this.http.post<any>(`${this.apiUrl}`+ '/all', { language: lang })
      .subscribe(
        () => {
          console.log('Langue envoyée avec succès au backend');
          // Traitez la réponse du backend si nécessaire
        }
      );
  }
}
