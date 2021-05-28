import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { IndexDbService } from './services/index-db.service';
import { singleSpaPropsSubject } from './../single-spa/single-spa-props';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { ApiService } from './services/api.service';
import { ChildComponent } from './child/child.component';
@Component({
  selector: 'anomaly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Anomaly';
  yoshiUrl = '';
  id;
  tableData =[];
  // tableData = [
  //   {
  //     dataId: '1MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
  //     sampleTime: 5,
  //     ne: '1MJF901',
  //     pmType: 'OPR',
  //     defaultDataRange: '10,20',
  //     timeForForwardPrediction: 12,
  //     modelConfigName: 'OPR',
  //     jobStatus: 'PAUSED',
  //     dataSetName: 'pmdata',
  //     jobType: 'EXECUTION',
  //     modelType: 'FORECAST',
  //     checkboxdata: false,
  //   }, {
  //     dataId: '2MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
  //     sampleTime: 5,
  //     ne: '1MJF901',
  //     pmType: 'OPR',
  //     defaultDataRange: '10,20',
  //     timeForForwardPrediction: 12,
  //     modelConfigName: 'OPR',
  //     jobStatus: 'PAUSED',
  //     dataSetName: 'pmdata21',
  //     jobType: 'EXECUTION',
  //     modelType: 'FORECAST',
  //     checkboxdata: false,
  //   }, {
  //     dataId: '3MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
  //     sampleTime: 5,
  //     ne: '1MJF901',
  //     pmType: 'OPR',
  //     defaultDataRange: '10,20',
  //     timeForForwardPrediction: 12,
  //     modelConfigName: 'OPR',
  //     jobStatus: 'PAUSED',
  //     dataSetName: 'pmdata213',
  //     jobType: 'EXECUTION',
  //     modelType: 'FORECAST',
  //     checkboxdata: false,
  //   }
  // ];

  selectedRow = 0;
  count: number;
  subscription;
  namespace;
  constructor(
    private apiService: ApiService,
    private idbService: IndexDbService,
    private sesService: SessionService,
    private router: Router) {
    singleSpaPropsSubject.subscribe((app: any) => {
      if (app &&  app.mainApp &&  app.mainApp.namespace) {
          this.namespace = app.mainApp.namespace;
          this.router.config.unshift({ path: this.namespace + '-anomaly', children: [{ path: 'child', component: ChildComponent }]
          });
      }
    });
  }
  ngOnInit(): void {
    this.apiService.getTableData().subscribe((res) => {
      console.log(res);
      this.tableData = res.post;
      this.loadSelectedData();
    });
      }
  loadSelectedData(): void {
    this.id = +this.sesService.getKeyValue('ID') !== 0 ? +this.sesService.getKeyValue('ID') : undefined;

    this.idbService.getAllData('table-data', this.id).subscribe((data) => {
      if (data && data.length) {
        delete data.id;
        data.forEach(element => {
          const index = this.tableData.findIndex(r => r.dataId === element.dataId);
          if (element.checkboxdata && index !== -1) {
            this.tableData[index].checkboxdata = true;
          }
        });
      }
    });
  }
  setClickedRow(index): void {
    this.selectedRow = index;
  }
  checkAlls(ev): void {
    this.tableData.forEach(x => x.checkboxdata = ev.target.checked);
    if (this.id) {
      this.idbService.updateData(this.tableData, this.id).subscribe((res) => {
      });
    } else {
      this.idbService.addData(this.tableData).subscribe((res) => {
        this.id = res;
      });
    }

  }

  isAllChecked(): boolean {
    if (this.tableData.length === 0) {
      return false;
    } else {
      return this.tableData.every(it => it.checkboxdata === true);
    }

  }
  addRow(forecast): void {
    if (this.id) {
      this.idbService.updateData(this.tableData, this.id).subscribe((res) => {
      });
    } else {
      this.idbService.addData(this.tableData).subscribe((res) => {
        this.id = res;
        this.sesService.setKeyValue('ID', this.id);
      });
    }
  }

navigate(path): void {
  this.router.navigate(['/' + this.namespace + '-' + path]);
}
navigateToCurrentApp(path) {
  this.router.navigate(['/' + this.namespace + '-' + 'anomaly/' + path]);
}
  ngOnDestroy(): void {
  }
}
