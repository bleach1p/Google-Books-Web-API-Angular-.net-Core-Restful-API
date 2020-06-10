import { BookList, Books } from './../models/books';
import { ToastrService } from 'ngx-toastr';
import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  readonly rootUrl = 'http://localhost:59035/api';
  favoriteBooksIds: string[] = new Array();
  public favoriteBooks: Books[];

  constructor(private http: HttpClient, private auth: AuthGuardService, private toastr: ToastrService) {
    this.CarregarListaFavoritos();
    this.CarregarListaFavoritosObjeto();
  }

  private async CarregarListaFavoritos(){
    await this.http.get<string[]>(this.rootUrl + '/Favorite/login?login=' + this.auth.user.id).toPromise().then(res => {
      this.favoriteBooksIds = res;
    });
  }

  public async CarregarListaFavoritosObjeto(){
    await this.http.get<BookList>(this.rootUrl + '/Favorite/login?login=' + this.auth.user.id + '&returnIdsString=true')
    .toPromise().then(res => {
      this.favoriteBooks = res.Items;
    });
  }

  public async SetNewFavorite(id: string){
    await this.http.post(this.rootUrl + '/Favorite?id=' + id + '&login=' + this.auth.user.id, {}).toPromise().then(res => {

      if (res === 'success'){
        this.favoriteBooksIds.push(id);
        this.CarregarListaFavoritosObjeto();
        this.toastr.success('Salvo com Sucesso!', 'Notificação');
      }
    });
  }

  public async RemoveFavorite(id: string){
    await this.http.delete(this.rootUrl + '/Favorite?id=' + id + '&login=' + this.auth.user.id).toPromise().then(res => {

      if (res === 'success'){

        for (let i = 0; i < this.favoriteBooksIds.length; i++){

          if ( this.favoriteBooksIds[i] === id ){
              this.favoriteBooksIds.splice(i, 1);
          }
        }
        for (let i = 0; i < this.favoriteBooks.length; i++){
          if (this.favoriteBooks[i].Id === id){
            this.favoriteBooks.splice(i, 1);
            this.toastr.warning('Removido com Sucesso', 'Notificação!');
          }
        }
      }
    });
  }
}
