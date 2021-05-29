import { Component, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { singleSpaPropsSubject } from './../single-spa/single-spa-props';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { ChildComponent } from './child/child.component';
import { Globals } from './services/global.service';
@Component({
  selector: 'anomaly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Anomaly';
  yoshiUrl = '';
  id;
  tableData = [];
  selectedRow = 0;
  count: number;
  subscription;
  namespace;
  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(forwardRef(() => Globals)) private globals: Globals) {
    singleSpaPropsSubject.subscribe((app: any) => {
      if (app && app.mainApp && app.mainApp.namespace) {
        this.namespace = app.mainApp.namespace;
        this.router.config.unshift({
          path: this.namespace + '-anomaly', children: [{ path: 'child', component: ChildComponent }]
        });
      }
    });
    this.globals.globalEventDistributor.getDataFromContainer().subscribe((res) => {
      console.log(' i got your message', res);
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
    const data = this.globals.globalEventDistributor.getBroadcastStoreByTopic('selectedIds');
    if (data && data.length) {
      delete data.id;
      data.forEach(element => {
        const index = this.tableData.findIndex(r => r.dataId === element.dataId);
        if (element.checkboxdata && index !== -1) {
          this.tableData[index].checkboxdata = true;
        }
      });
    }
  }
  setClickedRow(index): void {
    this.selectedRow = index;
  }
  checkAlls(ev): void {
    this.tableData.forEach(x => x.checkboxdata = ev.target.checked);
    this.globals.globalEventDistributor.setbroadCostData('selectedIds', this.tableData);
  }

  isAllChecked(): boolean {
    if (this.tableData.length === 0) {
      return false;
    } else {
      return this.tableData.every(it => it.checkboxdata === true);
    }

  }
  addRow(forecast): void {
    this.globals.globalEventDistributor.setbroadCostData('selectedIds', this.tableData);
  }

  navigate(path): void {
    this.router.navigate(['/' + this.namespace + '-' + path]);
  }
  navigateToCurrentApp(path): void {
    this.router.navigate(['/' + this.namespace + '-' + 'anomaly/' + path]);
  }
  ngOnDestroy(): void {
  }
}
