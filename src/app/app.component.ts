import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { IndexDbService } from './services/index-db.service';

@Component({
  selector: 'anomaly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Anomaly';
  yoshiUrl = '';
  id;
  tableData = [
    {
      dataId: '1MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
      sampleTime: 5,
      ne: '1MJF901',
      pmType: 'OPR',
      defaultDataRange: '10,20',
      timeForForwardPrediction: 12,
      modelConfigName: 'OPR',
      jobStatus: 'PAUSED',
      dataSetName: 'pmdata',
      jobType: 'EXECUTION',
      modelType: 'FORECAST',
      checkboxdata: false,
    }, {
      dataId: '2MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
      sampleTime: 5,
      ne: '1MJF901',
      pmType: 'OPR',
      defaultDataRange: '10,20',
      timeForForwardPrediction: 12,
      modelConfigName: 'OPR',
      jobStatus: 'PAUSED',
      dataSetName: 'pmdata21',
      jobType: 'EXECUTION',
      modelType: 'FORECAST',
      checkboxdata: false,
    }, {
      dataId: '3MJF901@1-20-19@OPTMIN@PM_NEAR_END_Tx',
      sampleTime: 5,
      ne: '1MJF901',
      pmType: 'OPR',
      defaultDataRange: '10,20',
      timeForForwardPrediction: 12,
      modelConfigName: 'OPR',
      jobStatus: 'PAUSED',
      dataSetName: 'pmdata213',
      jobType: 'EXECUTION',
      modelType: 'FORECAST',
      checkboxdata: false,
    }
  ];

  selectedRow = 0;
  count: number;
  subscription;
  constructor(
    private idbService: IndexDbService) {
  }
  ngOnInit(): void {
    this.idbService.getAllData('table-data', 1).subscribe((data) => {
      if (data) {
        this.id = 1;
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
        this.id = res;
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
        this.id = res;
      });
    } else {
      this.idbService.addData(this.tableData).subscribe((res) => {
        this.id = res;
      });
    }
  }


  ngOnDestroy(): void {
  }
}
