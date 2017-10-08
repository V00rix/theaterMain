
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SceneComponent } from './scene/scene.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'home', component: HomeComponent },
{path: '**', component: NotFoundComponent}																
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}