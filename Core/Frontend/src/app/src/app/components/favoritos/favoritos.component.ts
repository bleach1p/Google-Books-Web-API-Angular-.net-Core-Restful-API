import { AuthGuardService } from './../../services/auth-guard.service';
import { Books, BookList } from './../../models/books';
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  public books: Books[];
  constructor(private favoriteService: FavoriteService, private authLogin: AuthGuardService) {
  }

  ngOnInit(): void {
    this.BuscaFavoritos();
  }

  private async BuscaFavoritos(){
    await this.favoriteService.CarregarListaFavoritosObjeto();
    this.books = this.favoriteService.favoriteBooks;

  }

  public Desfavoritar(id: string){
    this.favoriteService.RemoveFavorite(id);
  }

}
