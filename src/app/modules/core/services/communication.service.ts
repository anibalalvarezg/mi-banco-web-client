import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }

  post(url: string, body: any) {
    return this.http.post(`${environment.serverHost}${url}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
