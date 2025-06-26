import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { MenuLayoutComponent } from './layout/menu-layout.component'; 

import { HttpClientModule } from '@angular/common/http';
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx"


@NgModule({
  declarations: [
    AppComponent,
    MenuLayoutComponent 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
  bootstrap: [AppComponent]
})
export class AppModule {}