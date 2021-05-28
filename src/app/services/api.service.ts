import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { assetUrl } from 'src/single-spa/asset-url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getTableData(): Observable<any> {
    return this.http.get('https://container-config.herokuapp.com/api/con/tabledata');
  }
}
