import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { PagesModule } from './pages/pages.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ModalImageComponent } from './components/modal-image/modal-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
