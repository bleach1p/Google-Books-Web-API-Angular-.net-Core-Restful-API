import { FavoritosComponent } from './src/app/components/favoritos/favoritos.component';
import { BooksSearchResultComponent } from './src/app/components/books-search-result/books-search-result.component';
import { Books } from './src/app/models/books';
import { AuthLoginGuard } from './src/app/middlewares/auth-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './src/app/components/dashboard/dashboard.component';
import { WelcomeComponent } from './src/app/components/welcome/welcome.component';

const routes: Routes = [
  {path: '',
  component: WelcomeComponent
},
  { path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthLoginGuard],
},

{ path: 'favoritos',
  component: FavoritosComponent,
  canActivate: [AuthLoginGuard] },

{ path: 'books',
  component: BooksSearchResultComponent,
  canActivate: [AuthLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
