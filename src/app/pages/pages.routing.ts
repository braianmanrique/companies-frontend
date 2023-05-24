import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './supporting/users/users.component';
import { CompaniesComponent } from './supporting/companies/companies.component';
import { ArticlesComponent } from './supporting/articles/articles.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';

// import { AuthGuard } from 'app/guards/auth.guard';
// import { PerfilComponent } from './perfil/perfil.component';
// import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [  
    {
      path: 'dashboard',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
        {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
        {path: 'profile', component: ProfileComponent, data: {title: 'User profile'}},
  
        // Supporting
        {path: 'users', component: UsersComponent, data: {titulo: 'App users'}},
        {path: 'companies', component: CompaniesComponent, data: {titulo: 'Supporting Companies'}},
        {path: 'articles', component: ArticlesComponent, data: {titulo: 'Supporting Articles'}},


  ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
