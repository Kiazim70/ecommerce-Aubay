import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Product } from '../model/product.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    standalone: true,
    imports: [NgFor, RouterLink]
})
export class CheckoutComponent implements OnInit {


  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log('Checkout component initialized.');

    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('access_token');

    if (userId && jwt) {
      const userIdNumber = +userId;
      console.log('User ID number:', userIdNumber);

      this.cartService.getCartItems(userIdNumber).subscribe(
        (cart: any) => {
          console.log('Received cart data:', cart);
          this.cartItems = cart.cart.cartItems.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            subTotal: item.subTotal,
            imgUrl: item.product.imgUrl
          }));
          this.totalPrice = cart.cart.totalPrice;
        },
        (error: any) => {
          console.error('Error fetching cart items:', error);
        }
      );
    } else {
      console.error('User ID or JWT token not found in local storage.');
    }
  }

  removeCartItem(productId: number) {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.cartService.removeCartItem(+userId, productId).subscribe(
        (updatedCartItems: CartItem[]) => {
          this.cartItems = updatedCartItems;
          window.location.reload();
        },
        (error: any) => {
          console.error('Error removing cart item:', error);
        }
      );
    }
  }
}