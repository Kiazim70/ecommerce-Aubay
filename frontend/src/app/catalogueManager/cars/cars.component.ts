import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { Observable } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { ItemsCatalogueComponent } from "../items-catalogue/items-catalogue.component";
import { Car } from 'src/app/model/car.model';
import { TranslateService } from 'src/app/services/translation/translate.service';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatCell, MatHeaderCell } from '@angular/material/table';

@Component({
    selector: 'app-cars',
    standalone: true,
    templateUrl: './cars.component.html',
    styleUrl: './cars.component.css',
    imports: [RouterLink, NgFor, NgIf, FormsModule, AsyncPipe, 
      MatFormField, MatIcon, MatCell, MatHeaderCell,
      MatPaginator, RouterOutlet, CurrencyPipe]
})

export class CarsComponent implements OnInit {

  pageIndex = 0;
  pageSize = 12;
  searchTerm: string = '';
  filteredCars: Car[] = [];
  totalCars = 12;
  category_car_id = this.route.snapshot.paramMap.get('id');

  constructor(
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService  ) {}

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      this.applyFilter();
    });
      this.applyFilter();
  }
  applyFilter() {
    this.carsService.searchCarsByCategory(this.category_car_id, this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredCars = jsonResponse.content;
      this.totalCars = jsonResponse.totalElements;
    });
  }


  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.applyFilter();
  }


  deleteCar(id: number) {
    this.carsService.deleteCar(id).subscribe(
     (data: any) => {
        console.log(data);
        this.applyFilter();
      },
      (error: any) => console.error('Error deleting car:', error)
    );
  }



  updateCar(id: number) {
    this.router.navigate(['update-car']);
    }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}