import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { BrandsComponent } from "../../toutelLesMarques/brands/brands.component";


@Component({
    selector: 'app-items-catalogue',
    standalone: true,
    templateUrl: './items-catalogue.component.html',
    styleUrl: './items-catalogue.component.css',
    imports: [RouterLink, NgFor, AsyncPipe, BrandsComponent]
})
 export class ItemsCatalogueComponent implements OnInit {


  category: Category[] = [];

  constructor(private categoryService: CategoryService, 
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      // Mettre à jour les voitures après le changement de langue
      this.getCategories();
    });
    
    // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
    this.getCategories();    
  }
  getCategories() {
    // this.category = this.categoryService.getAllCategories();
    // // Assuming your service returns an object with total count
    // this.category.subscribe(() => {
    //   this.category = this.category;
    // });
    this.categoryService.getAllCategories()
    .subscribe(
      (cat: any[]) => {
        this.category = cat;
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

  

 