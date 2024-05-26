import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Product, ProductService } from 'src/app/services/product.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatFormField],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{

  
  productForm!: FormGroup;
  submitted = false;
  id!: number;
  image: any;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private translate : TranslateService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadProductData();
}

initForm(): void {
  this.productForm = this.formBuilder.group({
    id: [''],
    locale: [''],
    category_id: this.route.snapshot.paramMap.get('id'),
    name: [''],
    description: [''],
    price: [''],
    image: ['']
  });
}

loadProductData(): void {
  this.productService.getProductById(this.id).subscribe((product: Product) => {
    this.productForm.patchValue(product);
  });
}
  updateProduct(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('id', this.productForm.get('id')!.value);
      formData.append('locale', this.productForm.get('locale')!.value);
      formData.append('category_id', this.productForm.get('category_id')!.value);
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('image', this.productForm.get('image')!.value);

    this.productService.updateProduct(this.id, formData).subscribe(() => {
      console.log('product updated successfully');
      this.router.navigate(['/product-list']);
        });
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
  
        this.productForm.patchValue({ image: selectedFile });
      }
    }
}