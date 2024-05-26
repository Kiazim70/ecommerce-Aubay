import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { TarifAuto } from 'src/app/model/tarifauto.model';
import { TarifAutoService } from 'src/app/services/tarif-auto.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslateService } from 'src/app/services/translation/translate.service';



@Component({
  selector: 'app-tarif-auto-list',
  standalone: true,
  imports: [MatCard, MatCardContent, MatIcon, MatDialogModule,
    MatPaginator, FormsModule, NgFor
  ],
  templateUrl: './tarif-auto-list.component.html',
  styleUrl: './tarif-auto-list.component.css'
})
export class TarifAutoListComponent implements OnInit {

  
tarifsAuto: TarifAuto[] = [];
pageIndex = 0;
pageSize = 10;
searchTerm: string = '';
totaltarifAuto = 0;

  constructor(private tarifAutoService: TarifAutoService, 
              private router: Router,
              private translate : TranslateService) {}

  ngOnInit(): void {
    this.translate.langChanges$.subscribe(() => {
    this.loadTarifsAuto();
    });
    this.loadTarifsAuto();
  }

  loadTarifsAuto() {
    this.tarifAutoService.getAllTarifsAuto (this.searchTerm,this.pageIndex, this.pageSize).subscribe((jsonResponse: any) => {
      this.tarifsAuto = jsonResponse.content;
      this.totaltarifAuto = jsonResponse.totalElements;
    });
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadTarifsAuto(); 
  }

  addTarifAuto(tarifAuto: TarifAuto) {
    this.router.navigate(['tarifautoform']);
  }
  updateTarifAuto(id: number) {
    console.log("id"+id);
    this.router.navigate(['tarifautoform', id]);
  }
  
  deleteTarifAuto(id: number) {
    this.tarifAutoService.deleteTarifAuto(id).subscribe(
      (data: any) => {
        console.log(data);
        this.loadTarifsAuto();
      },
      (error: any) => console.log(error)
    );  
  }
}
