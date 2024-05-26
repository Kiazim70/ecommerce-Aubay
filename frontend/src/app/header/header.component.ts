import { NgFor, NgIf } from '@angular/common';
import { Product, ProductService } from './../services/product.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserService } from '../services/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { TranslateService } from '../services/translation/translate.service';
import { TranslatePipe } from "../services/translation/translate.pipe";
import { CarFilterPopupComponent } from "../catalogueManager/car-filter-popup/car-filter-popup.component";




@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, RouterLink, CartComponent, RouterOutlet, TranslatePipe, CarFilterPopupComponent]
})
export class HeaderComponent implements OnInit {

  title = 'TITLE';

  isLoggedIn = false;
  userDetails?: User;
  //products: Product[] = [];
 

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private translateService: TranslateService) {
     console.log(translateService.data);
    }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('access_token');
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        const userId = localStorage.getItem('user_id');

        if (userId) {
          const userIdNumber = +userId;

          this.userService.getUserDetails(userIdNumber.toString()).subscribe(
            (response: any) => {
              console.log('User details:', response);
              this.userDetails = response;
            },
            (error: any) => {
              console.error('Error fetching user details:', error);
            }
          );
        }
      } else {
        this.userDetails = undefined;
      }
    });

    const userId = localStorage.getItem('user_id');

    if (userId) {
      const userIdNumber = +userId;

      this.userService.getUserDetails(userIdNumber.toString()).subscribe(
        (response: any) => {
          console.log('User details:', response);
          this.userDetails = response;
        },
        (error: any) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }
  useLang(lang: string) {
  this.translateService.use(lang);
  }
    
 
}
