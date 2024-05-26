import { Component, OnInit, Input } from '@angular/core';
import { CreditCardFormComponent } from "../creditCardManager/credit-card-form/credit-card-form.component";
import { AsyncPipe, CurrencyPipe, NgFor } from '@angular/common';
import { ModelComponent } from "../toutelLesMarques/model/model.component";
import { TranslateService } from '../services/translation/translate.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ModelService } from '../services/model.service';
import { BuyComponent } from "../buy/buy.component";
import { Model } from '../model/modeli.model';
import { NgModel } from '@angular/forms';
import { TranslatePipe } from "../services/translation/translate.pipe";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-buymodel',
    standalone: true,
    templateUrl: './buymodel.component.html',
    styleUrl: './buymodel.component.css',
    imports: [CreditCardFormComponent, CurrencyPipe, ModelComponent,MatFormFieldModule,
      MatInputModule, BuyComponent, NgFor, AsyncPipe, TranslatePipe]
})
export class BuymodelComponent implements OnInit {


  id: string | null = null;
  model!: Model;

  constructor(private translate : TranslateService,
              private route : ActivatedRoute,
              private modelService : ModelService
  ){}


ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
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
