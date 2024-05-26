import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../model/modeli.model';
import { TranslateService } from './translation/translate.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelBrandsService {

  private apiUrl = 'http://localhost:8080/api/v1/models';


  constructor(private http : HttpClient,
              private translate: TranslateService) { }

  searchModelByBrands(brand_id : any, searchTerm: any, pageIndex: number, pageSize: number) : Observable<Model[]>{
    const l = this.translate.currentLanguage;
    let params = new HttpParams()
      .set('currentLanguage', l)
      .set('brand_id', brand_id)
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('searchTerm', searchTerm);

    return this.http.get<Model[]>(`${this.apiUrl}/model`, { params });
}

deleteModel(id: number) {
  return this.http.delete(`${this.apiUrl}/delete/${id}`);
}
}
