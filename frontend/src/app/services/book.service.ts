import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IBookResponce } from '../../models/book.models'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBookResponce> {
    return this.http.get<IBookResponce>('https://www.googleapis.com/books/v1/volumes?q=quilting')
  }
}
