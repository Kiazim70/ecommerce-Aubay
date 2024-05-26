import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageByLocaleService {
  locale: any;

  constructor() { }

  public getMessage(id: any) {
   this.locale = this.getMessage(this.locale);
   return this.getMessage;
}
}
