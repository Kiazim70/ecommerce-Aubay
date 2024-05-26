import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_KEY = 'selectedLanguage';

  constructor() { }

  getSelectedLanguage(): string {
    return localStorage.getItem(this.LANG_KEY) || 'fr'; // Retourne la langue enregistrée ou 'fr' par défaut
  }

  setSelectedLanguage(language: string): void {
    localStorage.setItem(this.LANG_KEY, language);
  }

}