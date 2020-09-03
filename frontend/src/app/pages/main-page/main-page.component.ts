import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BookService } from '../../services/book.service'
import { IBookResponce, IBook } from 'src/models/book.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  books$: Observable<IBookResponce>
  books: IBook[]
  
  constructor(private bookService: BookService) {
    this.books$ = bookService.getBooks()
  }

  ngOnInit(): void {
    this.books$.subscribe(books => {
      this.books = books.items
      console.log(books.items)
    })
  }

}
