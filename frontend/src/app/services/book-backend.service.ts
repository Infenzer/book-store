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

  addFavoriteBook(book: IBook, userId: number) {
    const bookDto = FavoriteBookApiDto.toDto(book)

    return this.http.post(`${this.baseUrl}/${userId}/favorite-book`, bookDto)
  }
}
