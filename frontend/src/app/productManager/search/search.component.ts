import { ProductService } from 'src/app/services/product.service';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../../services/product.service';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgFor, AsyncPipe, MatPaginator],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

nextPage($event: PageEvent) {
  const request = {};
  $event.pageIndex.toString();
  $event.pageSize.toString();
  this.handleSearchProduct();
}
  

  products!: Observable<Array<Product>>;
  searchformGroup: UntypedFormGroup | undefined;
  errorMessage!: string;
  totalElements: number = 0;

  constructor(private fb: UntypedFormBuilder,
              private productService: ProductService){}


  ngOnInit() {
    this.searchformGroup=this.fb.group({
      query : this.fb.control("")
    });
    this.handleSearchProduct();
    }

  handleSearchProduct() {
    let query=this.searchformGroup?.value.query;
    this.products=this.productService.searchProduct(query).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
   }

   handelDeleteProduct(p: Product) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (resp)=>{
        this.products=this.products.pipe(
          map(data=>{
            let index=data.indexOf(p);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })    
  }

}


