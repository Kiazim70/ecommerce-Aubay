import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  data: any = {}; 
  currentLanguage = 'en';
  langChanges$ = new EventEmitter<String>();
  
 
  constructor(private http: HttpClient ) {}


  use(lang: string): Promise<any> {
    this.currentLanguage = lang ;
   console.log(this.currentLanguage);
    return new Promise<{}>(resolve => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;

      this.http.get(langPath).subscribe(
        (response : any) => {
          this.data = response || {};
          resolve(this.data);
        },
        (error) => {
          console.error('Failed to load language data:', error);
          this.data = {};
          resolve(error); // Correction : Rejeter la promesse en cas d'erreur
        }
      );
      this.langChanges$.emit(lang);
    });
  }

 
}
