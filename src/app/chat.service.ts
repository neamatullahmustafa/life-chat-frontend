import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8000/message';

  constructor(private _HttpClient: HttpClient) {}

  sendMessage(username: string, message: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl, { username, message });
  }
}
