import { SearchBooksService } from './src/app/services/search-books.service';
import { AuthService } from 'angularx-social-login';
import { AuthGuardService } from './src/app/services/auth-guard.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  searchInput = '';

  constructor(public authGuard: AuthGuardService, private authService: AuthService, private routes: Router,
              private searchBooksService: SearchBooksService){

    this.authService.authState.subscribe((user) => {
      if (user != null){
        routes.navigateByUrl('/dashboard');
      }
    });
  }

  public Login(){
    this.authGuard.signInWithGoogle();
  }

  public Logout(){
    this.authGuard.signOut();
  }

  public async OnEnterSearch(){
    await this.searchBooksService.Search(this.searchInput);

    this.routes.navigateByUrl('/books');
  }

}
