import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [ 
  // {path: 'dashboard', component: PagesComponent},
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/login')
  // },
  {path: '**', component: NopagefoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
