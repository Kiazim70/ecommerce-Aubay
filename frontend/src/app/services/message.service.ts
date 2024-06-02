import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private kafkaApiUrl = 'http://localhost:9092/api/v1/kafka';


  constructor(private http : HttpClient) { }


  sendMessage(messageForm: any) : Observable<any>{
    return this.http.post(this.kafkaApiUrl, messageForm);
  }

}
