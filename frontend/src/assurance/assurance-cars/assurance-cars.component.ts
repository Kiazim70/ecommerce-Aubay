import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from "../../app/services/translation/translate.pipe";
import { NgFor, NgIf } from '@angular/common';
import { Car } from 'src/app/model/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { AssuranceCarsService } from 'src/app/services/assurance-cars.service';
import { AssuranceCars } from 'src/app/model/assurancecars.model';

@Component({
    selector: 'app-assurance-cars',
    standalone: true,
    templateUrl: './assurance-cars.component.html',
    styleUrl: './assurance-cars.component.css',
    imports: [TranslatePipe, RouterLink, NgFor]
})

export class AssuranceCarsComponent implements OnInit {
  
  getQuote() {
  this.router.navigate(['/tarifauto']);
}


  assuranceCars: AssuranceCars[] = [];


  constructor(private assuranceCarsService : AssuranceCarsService,
              private route : ActivatedRoute,
              private router : Router,
              private translate: TranslateService){}

ngOnInit(): void {
  //const product = this.car;
  this.translate.langChanges$.subscribe(() => {
    this.getAssuranceCars();
    });
        this.getAssuranceCars();
    }

    getAssuranceCars(): void {
      this.assuranceCarsService.getAll()
        .subscribe(
          (response: AssuranceCars[]) => {
            this.assuranceCars = response;
          },
          (error: any) => console.error(error)
        );
    }
  
    convertBytesToImageUrl(byteArray: string): string {
      return 'data:image/jpeg;base64,' + byteArray;
    }

}
