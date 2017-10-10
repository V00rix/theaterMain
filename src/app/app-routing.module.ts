
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SceneComponent } from './scene/scene.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InfoComponent  } from './info/info.component';

const appRoutes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'home', component: HomeComponent},
{path: 'info', component: InfoComponent },
{path: 'page-not-found', component: NotFoundComponent},																
// {path: '**', redirectTo: '/page-not-found'}																
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}