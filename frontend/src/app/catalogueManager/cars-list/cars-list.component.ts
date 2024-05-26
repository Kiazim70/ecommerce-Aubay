import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CategoryCar } from 'src/app/services/category.service';
import { CarsService } from 'src/app/services/cars.service';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { Car } from 'src/app/model/car.model';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, AsyncPipe, MatPaginator, MatIcon],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})

export class CarsListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  searchTerm: string = '';
  filteredCars: Car[] = [];
  totalCars = 10;
 

  constructor(private carsService: CarsService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {}

  ngOnInit(): void {
  
    this.translate.langChanges$.subscribe(() => {
      // Mettre à jour les voitures après le changement de langue
      this.getCars();
    });

    // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
    
      this.getCars();
    
  }

  
  getCars() {
    this.carsService.getAllProductCars(this.searchTerm,this.pageIndex, this.pageSize)
      // .pipe(tap<any>(carPage => this.totalItems = carPage.totalElements),
      // map<any, Car[]>(carPage => carPage.content));
      .subscribe((jsonResponse: any) => {
        this.filteredCars = jsonResponse.content;
        this.totalCars = jsonResponse.totalElements;
      });
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.getCars();
  }

  deleteCar(id: number) {
    this.carsService.deleteCar(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getCars();
      },
      (error: any) => console.log(error)
    );
  }

  addCar(car: Car) {
    this.router.navigate(['add-car']);
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}