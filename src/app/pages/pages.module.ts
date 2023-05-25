import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './supporting/users/users.component';
import { ComponentsModule } from '../components/components.module';
import { CompaniesComponent } from './supporting/companies/companies.component';
import { ArticlesComponent } from './supporting/articles/articles.component';
import { PipesModule } from '../pipes/pipes.module';
import { ArticleComponent } from './supporting/articles/article.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    CompaniesComponent,
    ArticlesComponent,
    ArticleComponent,
    SearchComponent
    
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: []
})
export class PagesModule { }
