import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor(public http: HttpClient) {}

  public getHttpResponse(url: string) {
    return this.http.get(url);
  }
}
