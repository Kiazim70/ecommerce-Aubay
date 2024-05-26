import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { TranslateService } from '../services/translation/translate.service';
import { LanguageService } from '../services/language/language.service';
import { HttpClient } from '@angular/common/http';
import { ProductListComponent } from '../productManager/product-list/product-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-lang-selector',
  standalone: true,
  imports: [],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.css'
})
export class LangSelectorComponent {
lang!: string;

selectedLanguage: string;

constructor(private prodcutService: ProductService) {
  this.selectedLanguage = 'en'; // Définition de la langue par défaut
}

changeLanguage(lang: string) {
  this.selectedLanguage = lang;
  this.sendLanguageToBackend(lang);
}

sendLanguageToBackend(lang: string) {
  // Envoi de la langue sélectionnée au backend Java
  this.prodcutService.sendSelectedLanguage(this.lang)
  .subscribe(
      response => {
        console.log('Langue envoyée avec succès au backend');
        // Traitez la réponse du backend si nécessaire
      },
      error => {
        console.error('Erreur lors de l\'envoi de la langue au backend:', error);
        // Traitez l'erreur si nécessaire
      }
    );
}
}
