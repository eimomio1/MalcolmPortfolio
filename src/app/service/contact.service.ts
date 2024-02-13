import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/messages'; // Update with your actual backend server URL

  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, message);
  }
}
