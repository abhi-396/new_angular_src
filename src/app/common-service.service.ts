import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  constructor(private http: HttpClient) { }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // console.log('Header', headers, this .token);
    return headers;
  }

  callService(endPoint: string, request: any, requestType: string) {
    const httpOptions = this .getHeaders();
    switch (requestType) {
      case 'get':
        return this .http.get(endPoint+ request, { headers: httpOptions });
      case 'post':
        return this .http.post(endPoint, request, { headers: httpOptions });
      case 'put':
        return this .http.put(endPoint, request, { headers: httpOptions });
    }
  }
}
