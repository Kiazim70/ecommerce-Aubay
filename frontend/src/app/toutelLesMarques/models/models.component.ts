import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCell, MatHeaderCell } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Model } from 'src/app/model/modeli.model';
import { ModelService } from 'src/app/services/model.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [MatFormField, FormsModule, MatIcon, MatCardModule, 
    RouterLink, NgFor, CurrencyPipe, MatPaginator,
    MatCell, MatHeaderCell],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent implements OnInit {

  searchTerm: string = '';
  filteredModels: Model [] = [];
  totalModels = 12;
  pageSize = 12;
  pageIndex = 0;
  brand_id = this.route.snapshot.paramMap.get('id');


  constructor(private modelService: ModelService,
              private route: ActivatedRoute,
              private translate: TranslateService
  ){}

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      this.applyFilter();
    });
      this.applyFilter();  
   }

  applyFilter() {
    this.modelService.searchModelByBrand(this.brand_id, this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      // this.brand_id = this.brand_id;
      this.filteredModels = jsonResponse.content;
      this.totalModels = jsonResponse.totalElements;
    });  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.applyFilter();
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }


}



