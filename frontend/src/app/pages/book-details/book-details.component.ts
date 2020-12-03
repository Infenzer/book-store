import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectBookDetails } from 'src/store';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { bookDetails } from 'src/store/actions/book.actions';
import { IBook, EBookFilter } from 'src/store/types/book';
import { BookService } from 'src/app/services/book.service';
import { parseApi } from 'src/utils/api.parsing';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()
  loading$ = new BehaviorSubject(true)
  book$: Observable<IBook>
  book: IBook | null = null
  authorBooks: IBook[] = []
  otherBooks: IBook[] = []

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute,
              private service: BookService,
              private router: Router) {
    this.book$ = store.select(selectBookDetails)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading$.next(true)
      this.store.dispatch(bookDetails( {bookId: params['id']} ))
    })

    this.book$.pipe(takeUntil(this.destroy$)).subscribe(bookDetails => {
      this.book = bookDetails

      if (bookDetails) {
        this.service.getBookByFilter(EBookFilter.inauthor, bookDetails.volumeInfo.authors[0])
        .pipe(takeUntil(this.destroy$))
        .subscribe(books => {
          this.authorBooks = this.sortBookList(books.items, bookDetails)
          this.loading$.next(false)
        })

        this.service.getBooks(this.book.volumeInfo.title, 40)
          .pipe(takeUntil(this.destroy$))
          .subscribe(books => {
            this.otherBooks = this.sortBookList(books.items, bookDetails)
            this.loading$.next(false)
          })
      }

    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  sortBookList(bookList: IBook[], bookDetails: IBook) {
    return parseApi(bookList)
      .filter(book => book.id !== bookDetails.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }

  routeBook(event: string) {
    this.resetState()
    this.router.navigate(['', 'book', event])
  }

  resetState() {
    this.book = null
    this.authorBooks = []
    this.otherBooks = []
    this.loading$.next(true)
  }
}
