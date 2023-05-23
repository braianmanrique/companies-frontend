import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: []
})
export class PagesModule { }
