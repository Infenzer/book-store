import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IBook } from 'src/models/book.models';
import { Store } from '@ngrx/store';
import { State, selectBookList } from 'src/store';
import { loadBookList } from 'src/store/actions/book.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  loading$: Observable<boolean>
  books$: Observable<IBook[]>
  books: IBook[]
  
  constructor(private store: Store<State>) {
    this.books$ = store.select(selectBookList)
    this.loading$ = store.select(store => store.book.loading)
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookList())
  }

}
