import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-update-brand',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatFormField, MatFormFieldModule, MatIcon,
    MatInputModule],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css'
})
export class UpdateBrandComponent implements OnInit {

  brandsFormUpdateGroup: any;
  submitted: boolean = false;
  image: any;
  id!: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private brandsService: BrandsService,
              private router: Router
  ){
     
  }

ngOnInit(): void {
  this.id = +this.route.snapshot.params['id'];
  this.initForm();
  this.loadBrandsData();
}

initForm(): void {
  this.brandsFormUpdateGroup = this.formBuilder.group({
    id: [''],
    locale: [''],
    brandname: [''],
    image: ['']
  });
}

loadBrandsData() {
  this.brandsService.getBrandsById(this.id).subscribe((brand: Brand) => {
    this.brandsFormUpdateGroup.patchValue(brand);
  });
}

onUpdateBrands() {
  if (this.brandsFormUpdateGroup.valid) {
    const formData = new FormData();
    formData.append('id', this.brandsFormUpdateGroup.get('id')!.value);
    formData.append('locale', this.brandsFormUpdateGroup.get('locale')!.value);
    formData.append('brandname', this.brandsFormUpdateGroup.get('brandname')!.value);
    formData.append('image', this.brandsFormUpdateGroup.get('image')!.value);

    this.brandsService.updateBrands(this.id, formData).subscribe(() => {
      console.log('Brand updated successfully');
      this.router.navigate(['/brands-list']);
    });
  }
}


onSelectFile($event: Event) {
  const files = ($event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const selectedFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
    };
    reader.readAsDataURL(selectedFile);
    this.brandsFormUpdateGroup.patchValue({ image: selectedFile });
  }
}

}


