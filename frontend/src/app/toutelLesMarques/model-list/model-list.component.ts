import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Model } from 'src/app/model/modeli.model';
import { ModelService } from 'src/app/services/model.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-model-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, AsyncPipe, MatPaginator, AsyncPipe, MatIcon],
  templateUrl: './model-list.component.html',
  styleUrl: './model-list.component.css'
})
export class ModelListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  searchTerm: string = '';
  filteredModels: Model[] = [];
  totalModels = 10;
  // brand_id = this.route.snapshot.paramMap.get('id');
 

  constructor(private modelService: ModelService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {}

  ngOnInit(): void {
  
    this.translate.langChanges$.subscribe(() => {
      // Mettre à jour les voitures après le changement de langue
      this.getModels();
    });

    // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
    
      this.getModels();
    
  }

  
  getModels() {
    this.modelService.getAllModelBrands(this.searchTerm,this.pageIndex, this.pageSize)
      // .pipe(tap<any>(carPage => this.totalItems = carPage.totalElements),
      // map<any, Car[]>(carPage => carPage.content));
      .subscribe((jsonResponse: any) => {
        this.filteredModels = jsonResponse.content;
        this.totalModels = jsonResponse.totalElements;
      });
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.getModels();
  }

  deleteModel(id: number) {
    this.modelService.deleteModel(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getModels();
      },
      (error: any) => console.log(error)
    );
  }

  addModel(model: Model) {
    this.router.navigate(['add-model']);
  }

  convertBytesToImageUrl(byteArray: string) {
    return 'data:image/jpeg;base64,' + byteArray;
  }
}


