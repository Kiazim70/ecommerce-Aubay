import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Model } from 'src/app/model/modeli.model';
import { ModelService } from 'src/app/services/model.service';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { TranslatePipe } from "../../services/translation/translate.pipe";
import { CustomerFormComponent } from "../../customerManager/customer-form/customer-form.component";
import { ModelCustomerComponent } from "../../model-customer/model-customer.component";
import { MessageModalComponent } from "../../messageManager/message-modal/message-modal.component";

@Component({
    selector: 'app-model',
    standalone: true,
    templateUrl: './model.component.html',
    styleUrl: './model.component.css',
    imports: [NgIf, NgFor, FormsModule, CurrencyPipe,
        TranslatePipe, RouterLink, NgClass, CustomerFormComponent, ModelCustomerComponent, MessageModalComponent]
})
export class ModelComponent implements OnInit {


  id: any;
  model: any;

  constructor(private modelService : ModelService,
              private route : ActivatedRoute,
              private router : Router,
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
    });
    }

    modelCustomer(id: any) {
      this.router.navigate(['modelCustomer', this.model.id]);
    }
    
  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}