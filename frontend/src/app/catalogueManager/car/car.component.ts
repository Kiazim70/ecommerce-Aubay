import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { CarsService } from 'src/app/services/cars.service';
import { CartService } from 'src/app/services/cart.service';
import { Car } from 'src/app/model/car.model';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { TranslatePipe } from "../../services/translation/translate.pipe";
import { MessageModalComponent } from "../../messageManager/message-modal/message-modal.component";


@Component({
    selector: 'app-car',
    standalone: true,
    templateUrl: './car.component.html',
    styleUrl: './car.component.css',
    imports: [NgIf, FormsModule, CurrencyPipe, TranslatePipe, MessageModalComponent]
})
export class CarComponent implements OnInit {

  // selectedQuantity: number = 1;
  id: any;
  car: any;

  constructor(private carsService : CarsService,
              private route : ActivatedRoute,
              private router : Router,
              private translate: TranslateService){}

ngOnInit(): void {
  //const product = this.car;
  this.translate.langChanges$.subscribe(() => {
    this.getCarByOne();
    });
        this.getCarByOne();
    }

    getCarByOne(){
      this.id = this.route.snapshot.params['id'];
        this.carsService.getCarUnit(this.id)
          .subscribe((car: Car) => {
            console.log(car)
            this.car = car;
          }, (error: any) => console.log(error));
    }

    // billing(id: any) {
    //   this.router.navigate(['billing']);
    // }

    carCustomer(id: any) {
      this.router.navigate(['carCustomer', this.car.id]);
      }
      
  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}