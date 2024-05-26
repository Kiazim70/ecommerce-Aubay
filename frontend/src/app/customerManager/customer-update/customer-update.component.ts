import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent implements OnInit {
  
  customerForm!: FormGroup;
  id!: number;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      adress: [''],
      zipcode: [''],
      country: ['']
    });

    this.id = +this.route.snapshot.params['id'];

    this.customerService.getCustomerById(this.id).subscribe((customer: Customer) => {
      this.customerForm.patchValue(customer);
    });
  }

  updateCustomer(): void {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }

    this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe(() => {
      console.log('Customer updated successfully');
      this.router.navigate(['/customer-list']);
    });
  }
}