import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, AsyncPipe, MatPaginator],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  totalProducts = 10;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService  ) {}

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      this.applyFilter();
    });
      this.applyFilter();
  }
  applyFilter() {
    this.productService.searchedProducts(this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredProducts = jsonResponse.content;
      this.totalProducts = jsonResponse.totalElements;
    });
  }


  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.applyFilter();
  }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
     (data: any) => {
        console.log(data);
        this.applyFilter();
      },
      (error: any) => console.error('Error deleting product:', error)
    );
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}