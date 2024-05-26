import { Component, OnInit } from '@angular/core';

import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';

import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Model } from 'src/app/model/modeli.model';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { ModelService } from 'src/app/services/model.service';

import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { Rentcar } from 'src/app/model/rentcar.model';
import { RentcarService } from 'src/app/services/rentcar.service';
import { CustomerService } from 'src/app/services/customer.service';
import { TranslatePipe } from "../services/translation/translate.pipe";
import { Concessionnaire } from '../model/concessionnaire';
import { CustomerFormComponent } from "../customerManager/customer-form/customer-form.component";
import { ConcessionnaireComponent } from "../concessionnaireManager/concessionnaire/concessionnaire.component";
import { ConcessionnaireFormComponent } from "../concessionnaireManager/concessionnaire-form/concessionnaire-form.component";



@Component({
    selector: 'app-buy',
    standalone: true,
    templateUrl: './buy.component.html',
    styleUrl: './buy.component.css',
    imports: [NgIf, NgFor, FormsModule, CurrencyPipe, TranslatePipe]
})
export class BuyComponent implements OnInit {

selectedConcessionnaireDetails: any;
// concessionnaires: any;
selectedConcessionnaire: any;
concessionnaires: Concessionnaire [] = [];


  // model: any;
  customer!: Customer;
  id: any;
  customerForm!: FormGroup;
  model!: Model;
  models: any;



  constructor(private customerService: CustomerService,
              private translate : TranslateService,
              private route : ActivatedRoute,
              private modelService : ModelService,
              private router : Router){}


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.translate.langChanges$.subscribe(() => {
    this.getModelByOne();
    });
    this.getModelByOne();
  }
  
  getModelByOne(): void {
   
      this.modelService.getModelUnit(this.id)
        .subscribe((data: Model) => {
          console.log(data)
          this.model = data;
        }, (error: any) => console.log(error));
  }


    convertBytesToImageUrl(byteArray: string) {
      return 'data:image/jpeg;base64,' + byteArray;
    }
}

