import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-add-model',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatFormFieldModule, MatInputModule,
    NgIf, MatError,MatIcon, MatHint, MatLabel ],  
  templateUrl: './add-model.component.html',
  styleUrl: './add-model.component.css'
})
export class AddModelComponent implements OnInit {

  modelFormAddGroup!: FormGroup;
  image: string | undefined;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modelService: ModelService,
    private translate: TranslateService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.modelFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      brand_id: [this.route.snapshot.paramMap.get('id')],
      modelname: [''],
      description: [''],
      price: [''],
      image: [''],
      city: [''],
      country: [''],
      zipcode: ['']
    });
  }

  onAddModel(): void {
    if (this.modelFormAddGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.modelFormAddGroup.get('id')!.value);
      formData.append('locale', this.modelFormAddGroup.get('locale')!.value);
      formData.append('brand_id', this.modelFormAddGroup.get('brand_id')!.value);
      formData.append('modelname', this.modelFormAddGroup.get('modelname')!.value);
      formData.append('description', this.modelFormAddGroup.get('description')!.value);
      formData.append('price', this.modelFormAddGroup.get('price')!.value);
      formData.append('image', this.modelFormAddGroup.get('image')!.value);
      formData.append('city', this.modelFormAddGroup.get('city')!.value);
      formData.append('country', this.modelFormAddGroup.get('country')!.value);
      formData.append('zipcode', this.modelFormAddGroup.get('zipcode')!.value);


      this.modelService.addModel(formData).subscribe(
        () => {
          console.log('Model added successfully');
          this.router.navigate(['model-list']);
        },
        (        error: any) => {
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

      this.modelFormAddGroup.patchValue({ image: selectedFile });
    }
  }
}


