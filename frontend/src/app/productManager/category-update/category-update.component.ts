import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatFormFieldModule,
    MatInputModule], 
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent implements OnInit {

  id!: number;
  categoryFormUpdateGroup!: FormGroup;
  image: any;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadCategoryData();
  }

  initForm(): void {
    this.categoryFormUpdateGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      name: [''],
      image: ['']
    });
  }

  loadCategoryData(): void {
    this.categorieService.getCategoryById(this.id).subscribe((category: Category) => {
      this.categoryFormUpdateGroup.patchValue(category);
    });
  }

  onUpdateCategory(): void {
    if (this.categoryFormUpdateGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.categoryFormUpdateGroup.get('id')!.value);
      formData.append('locale', this.categoryFormUpdateGroup.get('locale')!.value);
      formData.append('name', this.categoryFormUpdateGroup.get('name')!.value);
      formData.append('image', this.categoryFormUpdateGroup.get('image')!.value);

      this.categorieService.updateCategory(this.id, formData).subscribe(() => {
        console.log('Category updated successfully');
        this.router.navigate(['/list-category']);
      });
    }
  }
 
  onSelectFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(selectedFile);
      this.categoryFormUpdateGroup.patchValue({ image: selectedFile });
    }
  }
}