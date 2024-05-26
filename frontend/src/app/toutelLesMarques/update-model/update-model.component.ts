import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/model/modeli.model';
import { ModelService } from 'src/app/services/model.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-update-model',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatFormFieldModule, MatInputModule], 
  templateUrl: './update-model.component.html',
  styleUrl: './update-model.component.css'
})
export class UpdateModelComponent implements OnInit {

  id!: number;
  modelFormUpdateGroup!: FormGroup;
  image: any;
  submitted: boolean = false;
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modelService: ModelService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadModelData();
  }

  initForm(): void {
    this.modelFormUpdateGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      brand_id: this.route.snapshot.paramMap.get('id'),
      modelname: [''],
      description: [''],
      price: [''],
      image: [''],
      city: [''],
      country: [''],
      zipcode: ['']
    });
  }

  loadModelData(): void {
    this.modelService.getModelById(this.id).subscribe((model: Model) => {
      this.modelFormUpdateGroup.patchValue(model);
    });
  }

  updateModel(): void {
    if (this.modelFormUpdateGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.modelFormUpdateGroup.get('id')!.value);
      formData.append('locale', this.modelFormUpdateGroup.get('locale')!.value);
      formData.append('brand_id', this.modelFormUpdateGroup.get('brand_id')!.value);
      formData.append('modelname', this.modelFormUpdateGroup.get('modelname')!.value);
      formData.append('description', this.modelFormUpdateGroup.get('description')!.value);
      formData.append('price', this.modelFormUpdateGroup.get('price')!.value);
      formData.append('image', this.modelFormUpdateGroup.get('image')!.value);
      formData.append('city', this.modelFormUpdateGroup.get('city')!.value);
      formData.append('country', this.modelFormUpdateGroup.get('country')!.value);
      formData.append('zipcode', this.modelFormUpdateGroup.get('zipcode')!.value);


      
      this.modelService.updateModel(this.id, formData).subscribe(() => {
        console.log('Model updated successfully');
        this.router.navigate(['/model-list']);
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

      this.modelFormUpdateGroup.patchValue({ image: selectedFile });
    }
  }
}
