import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, catchError, of } from 'rxjs';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/services/car.service';
import { TranslatePipe } from 'src/app/services/translation/translate.pipe';
import { TranslateService } from 'src/app/services/translation/translate.service';



@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatFormFieldModule,
    MatInputModule],  

  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent implements OnInit {

  id!: number;
  carFormUpdateGroup!: FormGroup;
  image: any;
  submitted: boolean = false;
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadCarData();
  }

  initForm(): void {
    this.carFormUpdateGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      category_car_id: this.route.snapshot.paramMap.get('id'),
      name: [''],
      description: [''],
      price: [''],
      image: ['']
    });
  }

  loadCarData(): void {
    this.carService.getCarById(this.id).subscribe((car: Car) => {
      this.carFormUpdateGroup.patchValue(car);
    });
  }

  updateCar(): void {
    if (this.carFormUpdateGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.carFormUpdateGroup.get('id')!.value);
      formData.append('locale', this.carFormUpdateGroup.get('locale')!.value);
      formData.append('category_car_id', this.carFormUpdateGroup.get('category_car_id')!.value);
      formData.append('name', this.carFormUpdateGroup.get('name')!.value);
      formData.append('description', this.carFormUpdateGroup.get('description')!.value);
      formData.append('price', this.carFormUpdateGroup.get('price')!.value);
      formData.append('image', this.carFormUpdateGroup.get('image')!.value);

      
      this.carService.updateCar(this.id, formData).subscribe(() => {
        console.log('Car updated successfully');
        this.router.navigate(['/cars-list']);
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

      this.carFormUpdateGroup.patchValue({ image: selectedFile });
    }
  }
}