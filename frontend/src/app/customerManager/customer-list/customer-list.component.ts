import { Component, ViewChild, OnInit } from '@angular/core';
import { Customer } from '../../model/customer';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CustomerService } from '../../services/customer.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from  '@angular/material/table';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'



@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatFormField, MatInputModule, FormsModule, MatPaginator, 
    MatPaginatorModule, MatTableModule, MatIconModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'adress', 'zipcode', 'country','action']; // Define columns to display
  filteredCustomers: Customer[] = [];
  totalCustomers: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;
  searchTerm: string = '';
  
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private customerService: CustomerService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter() {
    this.customerService.searchCustomers(this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredCustomers = jsonResponse.content;
      this.totalCustomers = jsonResponse.totalElements;
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  addCustomer(customer: Customer) {
    this.router.navigate(['customer-form']);
  }

    deleteCustomer(id: number) {
      this.customerService.deleteCustomer(id).subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
    }
    
  updateCustomer(id: number) {
    console.log("id"+id);
    this.router.navigate(['/customer-update', id]);
  }
}


