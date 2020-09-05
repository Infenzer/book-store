import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IBookResponce } from '../../models/book.models'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  maxResults = 16
  startIndex = 0

  constructor(private http: HttpClient) { }

  getBooks(maxResults = 16): Observable<IBookResponce> {
    const results = `maxResults=${maxResults}&`

    this.maxResults = maxResults
    this.startIndex = 0

    return this.http.get<IBookResponce>('https://www.googleapis.com/books/v1/volumes?q=Метро&' + results)
  }

  getNextBooks() {
    this.startIndex += this.maxResults

    const results = `maxResults=${this.maxResults}&`
    const index = `startIndex=${this.startIndex}&`
    
    return this.http.get<IBookResponce>('https://www.googleapis.com/books/v1/volumes?q=Метро&' + results + index)
  }
}
