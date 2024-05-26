import { Component, OnInit, Input } from '@angular/core';
import { ModelService } from '../services/model.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '../services/translation/translate.service';
import { Model } from '../model/modeli.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { CustomerFormComponent } from "../customerManager/customer-form/customer-form.component";
import { TranslatePipe } from "../services/translation/translate.pipe";

@Component({
    selector: 'app-model-customer',
    standalone: true,
    templateUrl: './model-customer.component.html',
    styleUrl: './model-customer.component.css',
    imports: [CurrencyPipe, CustomerFormComponent, TranslatePipe, NgIf]
})
export class ModelCustomerComponent implements OnInit {
 
  @Input() model: any;
  id: any;

  constructor(private modelService : ModelService,
              private route : ActivatedRoute,
              private translate: TranslateService,
            ){}

ngOnInit(): void {
  //const product = this.car;
  this.translate.langChanges$.subscribe(() => {
    this.getModelByOne();
    });
        this.getModelByOne();
    }

    getModelByOne(){
      this.id = this.route.snapshot.params['id'];
      this.modelService.getModelById(this.id).subscribe((model: Model) => {
        this.model = model;
        // this.modelService.getModelUnit(this.id)
        //   .subscribe((data: Model[]) => {
        //     console.log(data)
        //     this.model = data;
        //   }, (error: any) => console.log(error));
    })
    }

   
    
  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}


