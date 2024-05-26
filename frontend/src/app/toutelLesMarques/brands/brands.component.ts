import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { BrandsService } from 'src/app/services/brands.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {


brands: Brand[] = [];


constructor(private translate : TranslateService,
            private brandsService : BrandsService
){}


ngOnInit(): void {
  this.translate.langChanges$.subscribe(() => {
    // Mettre à jour les voitures après le changement de langue
    this.getBrands();
  });
  
  // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
  this.getBrands();  
}
  getBrands() {
    this.brandsService.getAllBrands()
    .subscribe(
      (cat: any[]) => {
        this.brands = cat;
        // Traitez les données si nécessaire
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des catégories : ', error);
        // Gérez les erreurs de manière appropriée
      }
    );
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}





