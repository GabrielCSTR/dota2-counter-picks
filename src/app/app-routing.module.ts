import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'hero-list', pathMatch: 'full' }, 
  {
    path: 'hero-list',
    loadChildren: () => import('./pages/heros/hero-list/hero-list.module').then( m => m.HeroListPageModule)
  },
  {
    path: 'hero-details',
    loadChildren: () => import('./pages/heros/hero-detail/hero-detail.module').then( m => m.HeroDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
