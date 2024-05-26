import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardService } from 'src/app/credit-card.service';
import { CreditCard } from 'src/app/model/creditcard.model';


@Component({
  selector: 'app-creditcard-list',
  standalone: true,
  imports: [MatFormField, MatInputModule, FormsModule, MatPaginator, 
    MatPaginatorModule, MatTableModule, MatIconModule],  
  templateUrl: './creditcard-list.component.html',
  styleUrl: './creditcard-list.component.css'
})
export class CreditcardListComponent implements OnInit {


displayedColumns : string[] = ['id', 'card_number', 'expiry_date', 'cvv', 'customer_id', 'action']; // Define columns to display
totalCreditCards: number = 0;
filteredCreditCards: CreditCard[] = [];
searchTerm: string = '';
pageSize: number = 0;
pageIndex: number = 0;
creditCards!: CreditCard[];

//customer_id = this.route.snapshot.paramMap.get('id');
 

  
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private creditCardService: CreditCardService,
              private router : Router,
              private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter() {
    this.creditCardService.getAllCreditCards(this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
        this.filteredCreditCards = jsonResponse.content;
        this.totalCreditCards = jsonResponse.totalElements;
      },
      
    
(error) => {
        console.error('Error filtering credit cards:', error);
      }
    );
}
  

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  addCreditCard(creditCard: CreditCard) {
    this.router.navigate(['credit-card-form']);
  }

    deleteCreditCard(id: number) {
      this.creditCardService.deleteCreditCard(id).subscribe((data: any) => {
        console.log(data);
      },
      error => console.log(error));
    }
    
  updateCreditCard(id: number) {
    console.log("id"+id);
    this.router.navigate(['/credit-card-update', id]);
  }
}


