import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Concessionnaire } from 'src/app/model/concessionnaire';
import { ConcessionnaireService } from 'src/app/services/concessionnaire.service';

@Component({
  selector: 'app-concessionnaire',
  standalone: true,
  imports: [MatFormField, MatInputModule, FormsModule, MatPaginator, MatPaginatorModule, MatTableModule, MatIconModule],
  templateUrl: './concessionnaire.component.html',
  styleUrl: './concessionnaire.component.css'
})
export class ConcessionnaireComponent implements OnInit {
  concessionnaire!: Concessionnaire;

  displayedColumns: string[] = ['id', 'nameCompagny', 'nsiret', 'email', 'phone', 'fax', 'address', 'zipcode', 'country','action']; // Define columns to display
  filteredConcessionnaire: Concessionnaire[] = []
  totalCustomers: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  searchTerm: string = '';
  
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private concessionnaireService: ConcessionnaireService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter() {
    this.concessionnaireService.searchConcessionnaires(this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredConcessionnaire = jsonResponse.content;
      this.totalCustomers = jsonResponse.totalElements;
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  addConcessionnaire(concessionnaire: Concessionnaire) {
    this.router.navigate(['concessionnaire-form']);
  }

    deleteConcessionnaire(id: number) {
      this.concessionnaireService.deleteConcessionnaire(id).subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
    }
    
  updateConcessionnaire(id: number) {
    console.log("id"+id);
    this.router.navigate(['/concessionnaire-update', id]);
  }
}

