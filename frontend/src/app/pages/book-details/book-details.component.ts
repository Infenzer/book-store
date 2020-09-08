import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectBookDetails } from 'src/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { bookDetails } from 'src/store/actions/book.actions';
import { IBook } from 'src/models/book.models';
import { style } from '@angular/animations';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  loading$: Observable<boolean>
  book$: Observable<IBook>
  book: IBook

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) {
    this.loading$ = store.select(store => store.book.loading)
    this.book$ = store.select(selectBookDetails)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(bookDetails( {bookId: params['id']} ))
    })

    this.book$.subscribe(bookDetails => this.book = bookDetails)
  }

}
