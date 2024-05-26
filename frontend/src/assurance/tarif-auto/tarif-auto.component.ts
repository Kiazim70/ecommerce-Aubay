import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatRadioButton } from '@angular/material/radio';
import { Router } from '@angular/router';
import { TarifAutoService } from 'src/app/services/tarif-auto.service';
import { TranslateService } from 'src/app/services/translation/translate.service';


@Component({
  selector: 'app-tarif-auto',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardContent, MatFormField, MatLabel, MatRadioButton, NgIf, FormsModule],
  templateUrl: './tarif-auto.component.html',
  styleUrl: './tarif-auto.component.css'
})
export class TarifAutoComponent implements OnInit {

  tarifAutoForm!: FormGroup;
  searchBy: string = 'brand_model';

assuranceForm!: FormGroup<any>;

  constructor(private fb: FormBuilder,
              private tarifAutoService : TarifAutoService,
              private router : Router,
              private translate : TranslateService) {
                this.initForm();
              }

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      this.onChanges();
    });

    this.onChanges();
  }

    initForm() {
    this.tarifAutoForm = this.fb.group({
        searchOption: ['brand_model'],
        brand: [''],
        model: [''],
        registration: [''],
        zipcode: [''],
        city: [''],
        dateOfBirth: [''],
        ageObtainingPermit: [''],
        bonus: [''],
        lastname: [''],
        firstname: [''],
        phone: [''],
        email: [''],
        local: ['']
      });
    };

    onChanges(): void {
      this.tarifAutoForm.get('searchOption')?.valueChanges.subscribe(val => {
        this.searchBy = val;
        if (val === 'brand_model') {
          this.tarifAutoForm.get('registration')?.reset();
        } else {
          this.tarifAutoForm.get('brand')?.reset();
          this.tarifAutoForm.get('model')?.reset();
        }
      });
    }
  

  onSubmit() {
    this.tarifAutoService.saveTarifAuto(this.tarifAutoForm.value).subscribe(() => {
      console.log('TarifAuto saved successfully');
      this.router.navigate(['/tarif-auto-list']);
      this.tarifAutoForm.reset();
    });
 }
}