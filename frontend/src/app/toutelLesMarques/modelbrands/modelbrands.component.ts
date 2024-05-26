import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCell, MatHeaderCell } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Model } from 'src/app/model/modeli.model';
import { ModelBrandsService } from 'src/app/services/model-brands.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-modelbrands',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, AsyncPipe, MatFormField, MatIcon, MatCell, MatHeaderCell,
    MatPaginator, RouterOutlet, CurrencyPipe],
  templateUrl: './modelbrands.component.html',
  styleUrl: './modelbrands.component.css'
})
export class ModelbrandsComponent implements OnInit {

  pageIndex = 0;
  pageSize = 12;
  totalItems = 0;
  searchTerm: string = '';
  filteredModels: Model[] = [];
  totalModel = 12;
  brand_id = this.route.snapshot.paramMap.get('id');

  constructor(
    private modelBrandsService: ModelBrandsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService  ) {}

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
      this.modelFilter();
    });
      this.modelFilter();
  }
  modelFilter() {
    this.modelBrandsService.searchModelByBrands(this.brand_id, this.searchTerm, this.pageIndex, this.pageSize)
    .subscribe((jsonResponse: any) => {
      this.filteredModels = jsonResponse.content;
      this.totalModel = jsonResponse.totalElements;
    });
  }


  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.modelFilter();
  }


  deleteCar(id: number) {
    this.modelBrandsService.deleteModel(id).subscribe(
     (data: any) => {
        console.log(data);
        this.modelFilter();
      },
      (error: any) => console.error('Error deleting car:', error)
    );
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}