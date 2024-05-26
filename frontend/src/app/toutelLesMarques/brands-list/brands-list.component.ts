import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/model/brand.model';
import { BrandsService } from 'src/app/services/brands.service';
import { TranslateService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatIcon, RouterLink, MatIcon],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css'
})
export class BrandsListComponent implements OnInit {

  brands!: Observable<Brand[]>;


constructor(private brandsService: BrandsService,
            private router: Router,
            private translate: TranslateService ){}


ngOnInit(): void {
  this.translate.langChanges$.subscribe(() => {
    // Mettre à jour les voitures après le changement de langue
    this.getBrand();
  });

  // Appeler getCars pour récupérer les voitures une fois que la page est initialisée
  
    this.getBrand();  
  }

getBrand() {
  this.brands = this.brandsService.getAllBrands();
}

deleteBrand(id: number) {
  this.brandsService.deleteBrands(id).subscribe(
    (data: any) => {
      console.log(data);
      this.getBrand();
    },
    (error: any) => console.log(error)
  );    }

addBrand(brand: Brand) {
  this.router.navigate(['create-brand']);}


convertBytesToImageUrl(byteArray: string) {
  return 'data:image/jpeg;base64,' + byteArray;
}


}
