import { Component } from '@angular/core';
import { CarFilterPopupComponent } from "../car-filter-popup/car-filter-popup.component";

@Component({
    selector: 'app-search-car',
    standalone: true,
    templateUrl: './search-car.component.html',
    styleUrl: './search-car.component.css',
    imports: [CarFilterPopupComponent]
})
export class SearchCarComponent {

}
