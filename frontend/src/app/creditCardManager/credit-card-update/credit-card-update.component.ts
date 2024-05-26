import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardService } from 'src/app/credit-card.service';
import { CreditCard } from 'src/app/model/creditcard.model';

@Component({
  selector: 'app-credit-card-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf],
  templateUrl: './credit-card-update.component.html',
  styleUrl: './credit-card-update.component.css'
})
export class CreditCardUpdateComponent implements OnInit {

creditCardUpdate: any;
    id!: number;
    submitted: boolean = false;

constructor(private formBuilder : FormBuilder,
            private route : ActivatedRoute,
            private router : Router,
            private creditCardService : CreditCardService
){}

ngOnInit(): void {
    this.creditCardUpdate = this.formBuilder.group({
      id: [''],
      cardType: [''],
      cardNumber: [''],
      expirationDate: [''],
      cvv: [''],
      customer_id: this.route.snapshot.paramMap.get('id'),
     
    });

    this.id = +this.route.snapshot.params['id'];

    this.creditCardService.getCreditCardById(this.id).subscribe((creditCard: CreditCard) => {
      this.creditCardUpdate.patchValue(creditCard);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.creditCardUpdate.invalid) {
      return;
    }

    this.creditCardService.updateCreditCard(this.id, this.creditCardUpdate.value).subscribe(() => {
      console.log('CreditCard updated successfully');
      this.router.navigate(['/customer-list']);
    });
  }
}
