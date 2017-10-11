import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SceneComponent } from './scene/scene.component';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

import { PerformanceService } from './services/performace.service';
import { InfoComponent } from './info/info.component';
import { SessionsComponent } from './info/sessions/sessions.component';
import { SessionComponent } from './info/sessions/session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SceneComponent,
    NotFoundComponent,
    HomeComponent,
    InfoComponent,
    SessionsComponent,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
