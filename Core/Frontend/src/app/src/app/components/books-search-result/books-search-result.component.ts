import { FavoriteService } from '../../../../src/app/services/favorite.service';
import { SearchBooksService } from './../../services/search-books.service';
import { Books } from './../../models/books';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-search-result',
  templateUrl: './books-search-result.component.html',
  styleUrls: ['./books-search-result.component.css']
})
export class BooksSearchResultComponent implements OnInit {
  public books: Books[];

  constructor(private booksService: SearchBooksService, public favoriteService: FavoriteService, public toast: ToastrService) { }

  ngOnInit(): void {
    this.books = this.booksService.currentQueryBooks.Items;
  }

  public Favoritar(id: string){
    this.favoriteService.SetNewFavorite(id);
  }

  public Desfavoritar(id: string){
    this.favoriteService.RemoveFavorite(id);
  }

}
