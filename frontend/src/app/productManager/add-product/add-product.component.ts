import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, MatFormField],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  productFormAddGroup!: FormGroup<any>;
  image: string | undefined;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private translate: TranslateService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      category_id: [this.route.snapshot.paramMap.get('id')],
      name: [''],
      description: [''],
      price: [''],
      image: ['']
    });
  }

  addProduct(): void {
    if (this.productFormAddGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.productFormAddGroup.get('id')!.value);
      formData.append('locale', this.productFormAddGroup.get('locale')!.value);
      formData.append('category_id', this.productFormAddGroup.get('category_id')!.value);
      formData.append('name', this.productFormAddGroup.get('name')!.value);
      formData.append('description', this.productFormAddGroup.get('description')!.value);
      formData.append('price', this.productFormAddGroup.get('price')!.value);
      formData.append('image', this.productFormAddGroup.get('image')!.value);

      this.productService.addProduct(formData).subscribe(
        () => {
          console.log('Product added successfully');
          this.router.navigate(['product-list']);
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

      this.productFormAddGroup.patchValue({ image: selectedFile });
    }
  }
}