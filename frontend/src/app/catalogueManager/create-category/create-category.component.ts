import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, MatError,
    MatFormFieldModule, MatInputModule, MatError,MatIcon, MatHint, MatLabel ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {


 categoryFormAddGroup!: FormGroup;
  submitted: boolean = false;
  image: any;

  constructor(private formBuilder: FormBuilder, 
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() : void {
    this.categoryFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      nameCat: [''],
      image: ['']
    });
  }


onAddCategory() : void {
  if (this.categoryFormAddGroup.valid) {
    const formData = new FormData();
    formData.append('id', this.categoryFormAddGroup.get('id')!.value);
    formData.append('locale', this.categoryFormAddGroup.get('locale')!.value);
    formData.append('nameCat', this.categoryFormAddGroup.get('nameCat')!.value);
    formData.append('image', this.categoryFormAddGroup.get('image')!.value);

    this.categoryService.addCategory(formData).subscribe(
      () => {
        console.log('Category added successfully');
        this.router.navigate(['/category-list']);
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  } else {
    console.error('Form is not valid');
  }  
}
onSelectFile(event: Event): void {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const selectedFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
      console.log('reader image = ' + this.image);
    };
    console.log(selectedFile.name)
    console.log(selectedFile.size)
    console.log(selectedFile.type)
    reader.readAsDataURL(selectedFile);
    console.log('image = ' + this.image);
    console.log('selectedFile = ' + selectedFile);

    this.categoryFormAddGroup.patchValue({ image: selectedFile });
  }
}
  }