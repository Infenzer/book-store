import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../config';
import {IBook} from '../../store/types/book';
import FavoriteBookApiDto from '../../models/FavoriteBookApiDto';

@Injectable({
  providedIn: 'root'
})

export class BookBackendService {

  private baseUrl = baseUrl + '/api/client'
  constructor(private http: HttpClient) { }

  addFavoriteBook(book: IBook, clientId: string) {
    const bookDto = FavoriteBookApiDto.toDto(book)
    return this.http.post(`${this.baseUrl}/${clientId}/favorite-book`, bookDto)
  }

  deleteFavoriteBook(bookId: string, clientId: string) {
    return this.http.delete(`${this.baseUrl}/${clientId}/favorite-book/${bookId}`)
  }

  getAllFavoriteBook(clientId: string) {
    return this.http.get<FavoriteBookApiDto[]>(`${this.baseUrl}/${clientId}/favorite-book`)
  }
}
