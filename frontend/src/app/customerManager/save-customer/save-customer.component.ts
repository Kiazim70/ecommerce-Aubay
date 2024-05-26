import { NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-save-customer',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatError, MatCard, MatCardTitle, MatCardContent ],
  templateUrl: './save-customer.component.html',
  styleUrl: './save-customer.component.css'
})
export class SaveCustomerComponent implements OnInit {

  @Input() carId!: number;
  customerForm!: FormGroup;
  submitted: any;
  car: any;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router : Router) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      adress: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],   
     });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      return;
    }
    // Call the customer service to save the customer data
    this.customerService.saveCustomer(this.customerForm.value).subscribe((response) => {
      this.router.navigate(['/buyCar', this.carId]);   
 
      // Reset the form after submission
       this.customerForm.reset();
    });
  }

}

