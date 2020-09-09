import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IBookResponce, IBook } from '../../models/book.models'
import { EBookFilter } from '../../models/book.models'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  maxResults = 16
  startIndex = 0
  searchValue = 'Метро'
  baseURL = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  getBooks(search = 'Метро', maxResults = 16): Observable<IBookResponce> {
    const results = `maxResults=${maxResults}&`

    this.maxResults = maxResults
    this.startIndex = 0
    this.searchValue = search

    return this.http.get<IBookResponce>(`${this.baseURL}?q=${search}&` + results)
  }

  getNextBooks() {
    this.startIndex += this.maxResults

    const results = `maxResults=${this.maxResults}&`
    const index = `startIndex=${this.startIndex}&`
    
    return this.http.get<IBookResponce>(`${this.baseURL}?q=${this.searchValue}&` + results + index)
  }

  getBookDetails(id: string) {
    return this.http.get<IBook>(`${this.baseURL}/` + id)
  }

  getBookByFilter(filterType: EBookFilter, filterValue: string, maxResults = 40) {
    const results = `maxResults=${maxResults}&`

    return this.http.get<IBookResponce>(`${this.baseURL}?q=${filterType}:${filterValue}&` + results)
  }
}
