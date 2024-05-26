import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreditCardService } from 'src/app/credit-card.service';
import { ModelComponent } from "../../toutelLesMarques/model/model.component";
import { Model } from 'src/app/model/modeli.model';

@Component({
    selector: 'app-credit-card-form',
    standalone: true,
    templateUrl: './credit-card-form.component.html',
    styleUrl: './credit-card-form.component.css',
    imports: [ReactiveFormsModule, MatFormField, NgIf, NgFor, MatError, ModelComponent, CurrencyPipe, MatLabel]
})
export class CreditCardFormComponent implements OnInit {
  @Input() customerId!: number;
  creditCardForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      customerId: [this.customerId, Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.creditCardForm.invalid) {
      return;
    }

    this.creditCardService.saveCreditCard(this.creditCardForm.value).subscribe(
      response => {
        this.router.navigate(['/billing']); // Replace with your actual path
        this.creditCardForm.reset();
      },
      error => {
        console.error('Error saving credit card:', error);
      }
    );
  }



        convertBytesToImageUrl(byteArray: string) {
          return 'data:image/jpeg;base64,' + byteArray;
        }
      
      }