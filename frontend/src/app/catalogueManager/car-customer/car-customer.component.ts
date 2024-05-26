import { Component, OnInit, Input } from '@angular/core';
import { CustomerFormComponent } from "../../customerManager/customer-form/customer-form.component";
import { CurrencyPipe, NgIf } from '@angular/common';
import { TranslatePipe } from "../../services/translation/translate.pipe";
import { TranslateService } from 'src/app/services/translation/translate.service';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/model/car.model';
import { SaveCustomerComponent } from "../../customerManager/save-customer/save-customer.component";

@Component({
    selector: 'app-car-customer',
    standalone: true,
    templateUrl: './car-customer.component.html',
    styleUrl: './car-customer.component.css',
    imports: [CustomerFormComponent, CurrencyPipe, NgIf, TranslatePipe, SaveCustomerComponent]
})
export class CarCustomerComponent implements OnInit {

  @Input() car: any;
  id: any;

  constructor(private translate : TranslateService,
              private route : ActivatedRoute,
              private carsService : CarsService
  ){

  }

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


    convertBytesToImageUrl(bytes: any): string {
       return 'data:image/jpeg;base64,' + bytes;
    }

}
