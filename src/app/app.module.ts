import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
const dbConfig: DBConfig = {
  name: 'vax-mcf-app',
  version: 1,
  objectStoresMeta: [{
    store: 'table-data',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'dataId', keypath: 'dataId', options: { unique: true } },
      { name: 'sampleTime', keypath: 'sampleTime', options: { unique: false } },
      { name: 'ne', keypath: 'ne', options: { unique: false } },
      { name: 'pmType', keypath: 'pmType', options: { unique: false } },
      { name: 'defaultDataRange', keypath: 'defaultDataRange', options: { unique: false } },
      { name: 'timeForForwardPrediction', keypath: 'timeForForwardPrediction', options: { unique: false } },
      { name: 'modelConfigName', keypath: 'modelConfigName', options: { unique: false } },
      { name: 'jobStatus', keypath: 'jobStatus', options: { unique: false } },
      { name: 'dataSetName', keypath: 'dataSetName', options: { unique: false } },
      { name: 'jobType', keypath: 'jobType', options: { unique: false } },
      { name: 'modelType', keypath: 'modelType', options: { unique: false } },
      { name: 'checkboxdata', keypath: 'checkboxdata', options: { unique: false } },
    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
