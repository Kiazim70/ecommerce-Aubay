import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatFormFieldModule,
              MatInputModule],   
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {

  id!: number;
  carFormUpdateGroup!: FormGroup;
  image: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadCategoryData();
  }

  initForm(): void {
    this.carFormUpdateGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      nameCat: [''],
      image: ['']
    });
  }

  loadCategoryData(): void {
    this.categoryService.getCategoryById(this.id).subscribe((category: Category) => {
      this.carFormUpdateGroup.patchValue(category);
    });
  }

  onUpdateCategory(): void {
    if (this.carFormUpdateGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.carFormUpdateGroup.get('id')!.value);
      formData.append('locale', this.carFormUpdateGroup.get('locale')!.value);
      formData.append('nameCat', this.carFormUpdateGroup.get('nameCat')!.value);
      formData.append('image', this.carFormUpdateGroup.get('image')!.value);

      this.categoryService.updateCategory(this.id, formData).subscribe(() => {
        console.log('Category updated successfully');
        this.router.navigate(['/category-list']);
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
      this.carFormUpdateGroup.patchValue({ image: selectedFile });
    }
  }
}