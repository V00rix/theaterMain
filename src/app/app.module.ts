import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SceneComponent } from './scene/scene.component';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

import { PerformanceService } from './services/performace.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SceneComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
