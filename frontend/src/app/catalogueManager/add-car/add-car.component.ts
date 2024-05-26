import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: 
[ReactiveFormsModule, MatFormField, MatFormFieldModule, MatInputModule,
     NgIf, MatError,MatIcon, MatHint, MatLabel ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})

export class AddCarComponent implements OnInit {
  carFormAddGroup!: FormGroup;
  image: string | undefined;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private translate: TranslateService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.carFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      category_car_id: [this.route.snapshot.paramMap.get('id')],
      name: [''],
      description: [''],
      price: [''],
      image: ['']
    });
  }

  onAddCar(): void {
    if (this.carFormAddGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.carFormAddGroup.get('id')!.value);
      formData.append('locale', this.carFormAddGroup.get('locale')!.value);
      formData.append('category_car_id', this.carFormAddGroup.get('category_car_id')!.value);
      formData.append('name', this.carFormAddGroup.get('name')!.value);
      formData.append('description', this.carFormAddGroup.get('description')!.value);
      formData.append('price', this.carFormAddGroup.get('price')!.value);
      formData.append('image', this.carFormAddGroup.get('image')!.value);
      this.carService.addCar(formData).subscribe(
        () => {
          console.log('Car added successfully');
          this.router.navigate(['cars-list']);
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

      this.carFormAddGroup.patchValue({ image: selectedFile });
    }
  }
}