import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, NgIf],
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.css'
})
export class CreateBrandComponent implements OnInit {


  brandsFormAddGroup!: FormGroup<any>;
  submitted: boolean = false;
  image: any;

   constructor(private formBuilder: FormBuilder,
               private brandsService: BrandsService,
               private router: Router
   ){}

  ngOnInit(): void {
      this.initForm();
  }

  initForm() : void {
    this.brandsFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      brandname: [''],
      image: ['']
    });
  }

  onAddBrands() {
    if (this.brandsFormAddGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.brandsFormAddGroup.get('id')!.value);
      formData.append('locale', this.brandsFormAddGroup.get('locale')!.value);
      formData.append('brandname', this.brandsFormAddGroup.get('brandname')!.value);
      formData.append('image', this.brandsFormAddGroup.get('image')!.value);
  
      this.brandsService.addBrands(formData).subscribe(
        () => {
          console.log('Brands added successfully');
          this.router.navigate(['/brands-list']);
        },
        ( error: any) => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }   
  }

  onSelectFile($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
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

      this.brandsFormAddGroup.patchValue({ image: selectedFile });
    }
  }


  }
