import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category.model';
import { CategoryCar, CategoryService } from 'src/app/services/category.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatIcon, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {



  category!: Observable<Category[]>;




  constructor(private translate : TranslateService,
              private router : Router,
              private categoryService : CategoryService
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
      this.category = this.categoryService.getAllCategories();
    }

    deleteCategory(id: number) {
      this.categoryService.deleteCategory(id).subscribe(
        (data: any) => {
          console.log(data);
          this.getCategory();
        },
        (error: any) => console.log(error)
      );    }
    
    addCategory(category: Category) {
      this.router.navigate(['create-category']);
    }
    convertBytesToImageUrl(byteArray: string) {
      return 'data:image/jpeg;base64,' + byteArray;
    }

}
