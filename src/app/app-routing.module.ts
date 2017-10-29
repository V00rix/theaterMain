
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BackgroundComponent } from './background/background.component';
import { SceneComponent } from './scene/scene.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InfoComponent  } from './info/info.component';

const appRoutes: Routes = [
{path: '', component: BackgroundComponent},
{path: 'info', component: InfoComponent },
{path: 'scene', component: SceneComponent },
{path: '404', component: NotFoundComponent},																
// {path: '**', redirectTo: '/page-not-found'}																
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}