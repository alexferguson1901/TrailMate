import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { MyTrailsPageComponent } from './pages/my-trails/my-trails.page';
import { TrailDetailsPageComponent } from './pages/trail-details/trail-details.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'my-trails', component: MyTrailsPageComponent },
  { path: 'trail-details/:id', component: TrailDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
