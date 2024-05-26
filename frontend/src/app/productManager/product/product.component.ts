import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from 'src/app/services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule]
})
export class ProductComponent implements OnInit {

  selectedQuantity: number = 1;
  id!: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdRef: ChangeDetectorRef,
    private router : Router
  ) {}

  ngOnInit() {
    const product = this.product;

    this.id = this.route.snapshot.params['id'];
    
    this.productService.getProduct(this.id)
      .subscribe((data: Product[]) => {
        console.log(data)
        this.product = data;
      }, (error: any) => console.log(error));
  }

  addToCart(productId: number, quantity: number) {
    this.productService.addToCart(productId, quantity).subscribe(
      response => {
        console.log('Product added to cart:', response);
  
        const userId = localStorage.getItem('user_id');
  
        if (userId) {
          this.cartService.getCartItemsCount(+userId).subscribe(
            (count: number) => {
              alert("Product added to cart.");
              this.cartService.updateCartItemCount(count);
              this.cdRef.detectChanges(); 
              window.location.reload();
            },
            (error: any) => {
              console.error('Error fetching cart count:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
       this.router.navigate(['checkout']);

  }
  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}
