import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }

  public post(url: string, body: any) {
    return this.http.post(`${environment.serverHost}${url}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public get(url: string, params?: any, disableEnv = false) {
    if (disableEnv) {
      return this.http.get(url, { params });
    }
    return this.http.get(`${environment.serverHost}${url}`, { params });
  }
}
