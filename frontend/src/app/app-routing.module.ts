import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component'
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'book/:id', component: BookDetailsComponent},
  {path: 'favorite', component: FavoritePageComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
