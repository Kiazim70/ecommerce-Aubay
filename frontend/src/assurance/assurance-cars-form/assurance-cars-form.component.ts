import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssuranceCarsService } from 'src/app/services/assurance-cars.service';

@Component({
  selector: 'app-assurance-cars-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf],
  templateUrl: './assurance-cars-form.component.html',
  styleUrl: './assurance-cars-form.component.css'
})
export class AssuranceCarsFormComponent implements OnInit {

assuranceCarsFormAddGroup: any;
image: string | undefined;
submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private assurancecarsService: AssuranceCarsService,
    private translate: TranslateService  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.assuranceCarsFormAddGroup = this.formBuilder.group({
      id: [''],
      locale: [''],
      name: [''],
      image: ['']
    });
  }

  onAddAssuranceCars(): void {
    if (this.assuranceCarsFormAddGroup.valid) {
      const formData = new FormData();
      formData.append('id', this.assuranceCarsFormAddGroup.get('id')!.value);
      formData.append('locale', this.assuranceCarsFormAddGroup.get('locale')!.value);
      formData.append('name', this.assuranceCarsFormAddGroup.get('name')!.value);
      formData.append('image', this.assuranceCarsFormAddGroup.get('image')!.value);
    
      this.assurancecarsService.addAssuranceCars(formData).subscribe(
        () => {
          console.log('AssuranceCars added successfully');
          this.router.navigate(['/assurancecars']);
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

      this.assuranceCarsFormAddGroup.patchValue({ image: selectedFile });
    }
  }
}


