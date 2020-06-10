import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public isLoggedIn(){
    return this.loggedIn;
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut(): void {
    this.authService.signOut();
  }

}
