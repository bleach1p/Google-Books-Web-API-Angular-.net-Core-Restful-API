import { FavoritosComponent } from './src/app/components/favoritos/favoritos.component';
import { FavoriteService } from './src/app/services/favorite.service';
import { SearchBooksService } from './src/app/services/search-books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './src/app/services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';

import { WelcomeComponent } from './src/app/components/welcome/welcome.component';
import { DashboardComponent } from './src/app/components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksSearchResultComponent } from './src/app/components/books-search-result/books-search-result.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('471169978944-qibuon21gsfkeo69n036r99bstq46lmd.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    BooksSearchResultComponent,
    FavoritosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SocialLoginModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    })
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig,
  },
  { provide: AuthGuardService },
  { provide: SearchBooksService },
  { provide: FavoriteService },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
