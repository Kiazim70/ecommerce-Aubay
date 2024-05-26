import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from "../../services/translation/translate.pipe";
import { CreditCardFormComponent } from "../../creditCardManager/credit-card-form/credit-card-form.component";
import { CurrencyPipe, NgIf } from '@angular/common';
import { Car } from 'src/app/model/car.model';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';

@Component({
    selector: 'app-buy-car',
    standalone: true,
    templateUrl: './buy-car.component.html',
    styleUrl: './buy-car.component.css',
    imports: [TranslatePipe, CreditCardFormComponent, CurrencyPipe, NgIf]
})
export class BuyCarComponent implements OnInit {

  id: string | null = null;
  car!: Car;

  constructor(private translate : TranslateService,
    private route : ActivatedRoute,
    private carsService : CarsService
){}
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
            .subscribe((data: Car) => {
              console.log(data)
              this.car = data;
            }, (error: any) => console.log(error));
      }



convertBytesToImageUrl(byteArray: string) {
  return 'data:image/jpeg;base64,' + byteArray;
}

}
