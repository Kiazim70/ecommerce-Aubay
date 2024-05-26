import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatIcon, RouterLink],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  category!: Observable<Category[]>;




  constructor(private translate : TranslateService,
              private router : Router,
              private categorieService : CategorieService
  ){}


  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      // Mettre à jour les voitures après le changement de langue
      this.getCategory();
    });

    // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
    
      this.getCategory();  
    }

    getCategory() {
      this.category = this.categorieService.getAllCategories();
    }

    deleteCategory(id: number) {
      this.categorieService.deleteCategorie(id).subscribe(
        (data: any) => {
          console.log(data);
          this.getCategory();
        },
        (error: any) => console.log(error)
      );    }
    
    addCategory(category: Category) {
      this.router.navigate(['add-category']);
    }
    convertBytesToImageUrl(byteArray: string) {
      return 'data:image/jpeg;base64,' + byteArray;
    }

}
