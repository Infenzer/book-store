import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IBookResponce, IBook } from '../../store/types/book'
import { EBookFilter } from '../../store/types/book'
import { IFilterState } from 'src/store/reducers/filter.reducers';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  filters: IFilterState = {
    new: false,
    prev: false,
    type: false
  }
  maxResults = 16
  startIndex = 0
  searchValue = 'Метро'
  baseURL = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  getParams(startIndex = false) {
    const results = `maxResults=${this.maxResults}&`
    const orderBy = this.filters.new ? 'orderBy=newest&' : ''
    const filter = this.filters.prev ? 'filter=partial&' : ''
    const printType = this.filters.type ? 'printType=magazines&' : 'printType=books&'
    const index = `startIndex=${this.startIndex}&`
    let params = results + orderBy + filter + printType

    if (startIndex) {
      params += index
    }

    return params
  }

  getBooks(search = 'Метро', maxResults = 16): Observable<IBookResponce> {
    this.maxResults = maxResults
    this.startIndex = 0
    this.searchValue = search

    return this.http.get<IBookResponce>(`${this.baseURL}?q=${search}&` + this.getParams())
  }

  setFilters(filters: IFilterState) {
    this.filters = filters
  }

  getNextBooks(maxResults = 16) {
    this.maxResults = maxResults
    this.startIndex += this.maxResults

    return this.http.get<IBookResponce>(`${this.baseURL}?q=${this.searchValue}&` + this.getParams(true))
  }

  getBookDetails(id: string) {
    return this.http.get<IBook>(`${this.baseURL}/` + id)
  }

  getBookByFilter(filterType: EBookFilter, filterValue: string, maxResults = 40) {
    const results = `maxResults=${maxResults}&`

    return this.http.get<IBookResponce>(`${this.baseURL}?q=${filterType}:${filterValue}&` + results)
  }
}
