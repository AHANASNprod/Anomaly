import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {
  constructor(private dbService: NgxIndexedDBService) { }

  addData(data): Observable<any> {
    return this.dbService.add('table-data', data);
  }
  updateData(data, i): Observable<any> {
    const  obj = {...data, id : i};
    return this.dbService.update('table-data', obj);
  }
  removeData(data): Observable<any> {
    return this.dbService.deleteByKey('table-data', data);
  }
  clearIndexDb(id): void {
    this.dbService.deleteByKey('table-data', id).subscribe((res) => {
      console.log('deleted');
    });
  }
  getAllData(name,i): Observable<any> {
    return this.dbService.getByID(name,i);
  }
  async addAll(data): Promise<void> {
    await Promise.all(data.map((row) => {
      return this.addData(row);
  }));
  }
}
