import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, 
    MatFormFieldModule, MatInputModule, MatError,MatIcon, MatHint, MatLabel ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  categoryFormAddGroup!: FormGroup;
  submitted: boolean = false;
  image: any;

  constructor(private formBuilder: FormBuilder, 
              private categorieService: CategorieService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() : void {
    this.categoryFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      name: [''],
      image: ['']
    });
  }


onAddCategory() : void {
  if (this.categoryFormAddGroup.valid) {
    const formData = new FormData();
    formData.append('id', this.categoryFormAddGroup.get('id')!.value);
    formData.append('locale', this.categoryFormAddGroup.get('locale')!.value);
    formData.append('name', this.categoryFormAddGroup.get('name')!.value);
    formData.append('image', this.categoryFormAddGroup.get('image')!.value);

    this.categorieService.addCategorie(formData).subscribe(
      () => {
        console.log('Category added successfully');
        this.router.navigate(['/list-category']);
      },
      (      error: any) => {
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