import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { IBook } from 'src/store/types/book';
import { Store } from '@ngrx/store';
import { State, selectBookList } from 'src/store';
import { loadBookList, nextBookList } from 'src/store/actions/book.actions';
import { addFavoriteBook, deleteFavoriteBook } from '../../../store/actions/favorite.actions'
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {BookBackendService} from '../../services/book-backend.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()
  loading$: Observable<boolean>
  books$: Observable<IBook[]>
  favoriteList$: Observable<IBook[]>
  favoriteList: IBook[]
  modalOpen = false

  constructor(private store: Store<State>,
              private bookBackendService: BookBackendService,
              private activatedRoute: ActivatedRoute) {
    this.books$ = store.select(selectBookList)
    this.loading$ = store.select(store => store.book.loading)
    this.favoriteList$ = store.select(store => store.favorite.favoriteBookList)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchValue = params['searchValue']

      if (searchValue) {
        this.store.dispatch(loadBookList({searchValue}))
      } else {
        this.store.dispatch(loadBookList({}))
      }
    })

    this.favoriteList$.pipe(takeUntil(this.destroy$)).subscribe(favoriteList => {
      this.favoriteList = favoriteList
    })
  }

  loadNextBookList(event: MouseEvent) {
    event.preventDefault()

    this.store.dispatch(nextBookList())
  }

  onAddFavoriteClick(e: MouseEvent, book: IBook) {
    e.preventDefault()
    e.stopPropagation();

    (e.currentTarget as HTMLDivElement).classList.toggle('heart-active')

    if (!this.favoriteList.find(favoriteBook => favoriteBook.id === book.id)) {
      this.store.dispatch(addFavoriteBook({book}))
    } else {
      this.store.dispatch(deleteFavoriteBook({bookId: book.id}))
    }
  }

}
