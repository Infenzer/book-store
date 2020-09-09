import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectBookDetails } from 'src/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { bookDetails } from 'src/store/actions/book.actions';
import { IBook, EBookFilter } from 'src/models/book.models';
import { BookService } from 'src/app/services/book.service';
import { parseApi } from 'src/utils/api.parsing';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  loading$: Observable<boolean>
  book$: Observable<IBook>
  book: IBook
  authorBooks: IBook[]
  otherBooks: IBook[]

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute, private service: BookService) {
    this.loading$ = store.select(store => store.book.loading)
    this.book$ = store.select(selectBookDetails)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(bookDetails( {bookId: params['id']} ))
    })

    this.book$.subscribe(bookDetails => {
      this.book = bookDetails

      if (bookDetails) {
        this.service.getBookByFilter(EBookFilter.inauthor, bookDetails.volumeInfo.authors[0])
        .subscribe(authorBooks => {
          this.authorBooks = this.sortBookList(authorBooks.items, bookDetails)
        })

        this.service.getBooks(this.service.searchValue, 40).subscribe(books => {
          this.otherBooks = this.sortBookList(books.items, bookDetails)
        })
      }

    })
  }

  sortBookList(bookList: IBook[], bookDetails: IBook) {
    return parseApi(bookList)
      .filter(book => book.id !== bookDetails.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }

}
