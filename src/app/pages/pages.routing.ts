import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';

// import { AuthGuard } from 'app/guards/auth.guard';
// import { PerfilComponent } from './perfil/perfil.component';
// import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [  
    {
      path: 'dashboard',
      component: PagesComponent,
      // canActivate: [AuthGuard],
      children: [
        {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
        {path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
  
    // {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
  
    // {path: 'account-settings', component: AccountSettingsComponent , data: {titulo: 'Ajustes de Cuenta'}},

    // Mantenimientos
    // {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de app'}},
  ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
