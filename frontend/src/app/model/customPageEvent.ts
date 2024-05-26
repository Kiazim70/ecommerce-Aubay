import { PageEvent } from '@angular/material/paginator';

export interface CustomPageEvent extends PageEvent {
  searchCustomers: string | undefined;
}