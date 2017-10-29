import { HttpModule, } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SceneComponent } from './scene/scene.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BackgroundComponent } from './background/background.component';
import { InfoComponent } from './info/info.component';
import { FieldsComponent } from './scene/fields/fields.component';

import { PerformanceService } from './services/performace.service';

import { MouseWheelDirective  } from './scene/mousewheel.directive';
import { PropertiesPipe } from './pipes/properties.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SceneComponent,
    NotFoundComponent,
    BackgroundComponent,
    InfoComponent,	
    FieldsComponent,
    MouseWheelDirective,
    PropertiesPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule, 
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
