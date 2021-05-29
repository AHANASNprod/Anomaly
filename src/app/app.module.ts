import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';
import { Globals } from './services/global.service';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private globals: Globals,
    @Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any) {
this.globals.globalEventDistributor = globalEventDispatcherRef;
}
}
