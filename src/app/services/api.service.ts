import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }
  getTableData(): Observable<any> {
    return this.http.get(this.globals.apiEndPoint + '/con/tabledata');
  }
}
