import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresidentComponent } from './president/president.component';
import { FormsModule } from '@angular/forms';
import { PresidentDetailComponent } from './president-detail/president-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PresidentSearchComponent } from './president-search/president-search.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
@NgModule({
  declarations: [
    AppComponent,
    PresidentComponent,
    PresidentDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PresidentSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
