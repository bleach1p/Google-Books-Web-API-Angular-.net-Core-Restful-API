import { Books, BookList } from './../models/books';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  readonly rootUrl = 'http://localhost:59035/api';
  public currentQueryBooks;

  constructor(private client: HttpClient) { }

  public async Search(input: string){
    this.currentQueryBooks = await this.client.get<BookList>(this.rootUrl + '/Books/' + input).toPromise();
  }
}
