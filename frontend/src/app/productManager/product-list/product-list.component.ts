import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductService } from 'src/app/services/product.service';
import { TranslateService } from 'src/app/services/translation/translate.service';




@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [MatFormField, MatInputModule, FormsModule, MatPaginator, 
      MatPaginatorModule, MatTableModule, MatIconModule,
      NgFor, RouterLink],

})
export class ProductListComponent implements OnInit{

  product!: Product;

  displayedColumns: string[] = ['id', 'category_id', 'name', 'image', 'price', 'description', 'locale','action']; // Define columns to display
  filteredProducts: Product[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  searchTerm: string = '';
  totalProducts: number = 0;

  
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private productService: ProductService,
              private translate : TranslateService,
              private router : Router,
              private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      // Mettre à jour les voitures après le changement de langue
      this.applyFilter();
    });
    
    // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
    this.applyFilter();
  }
  

  applyFilter() {
    this.productService.searchedProducts( this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredProducts = jsonResponse.content;
      this.totalProducts = jsonResponse.totalElements;
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  addProduct(product: Product) {
    this.router.navigate(['add-product']);
  }

    deleteProduct(id: number) {
      this.productService.deleteProduct(id).subscribe((data : any) => {
        console.log(data);
        this.applyFilter();
      }),
      (error: any) => console.log(error)    
    }


  updateProduct(id: number) {
    console.log("id"+id);
    this.router.navigate(['update-product', id]);
  }


  convertBytesToImageUrl(imageData: any): string {
    // Logique pour convertir les données binaires en URL
    // Par exemple, si imageData est une chaîne base64
    return 'data:image/jpeg;base64,' + imageData;
  }
}