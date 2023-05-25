import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './supporting/users/users.component';
import { CompaniesComponent } from './supporting/companies/companies.component';
import { ArticlesComponent } from './supporting/articles/articles.component';
import { ArticleComponent } from './supporting/articles/article.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'User profile'}},
  {path: 'search/:term', component: SearchComponent, data: {title: 'Searches'}},


  // Supporting
  {path: 'users', canActivate: [adminGuard],  component: UsersComponent, data: {title: 'App users'}},
  {path: 'companies', component: CompaniesComponent, data: {title: 'Supporting Companies'}},
  {path: 'articles', component: ArticlesComponent, data: {title: 'Supporting Articles'}},
  {path: 'article/:id', component: ArticleComponent, data: {title: 'Supporting Articles'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
