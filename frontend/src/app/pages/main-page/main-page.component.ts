import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IBook } from 'src/store/types/book';
import {Store} from '@ngrx/store';
import { State, selectBookList } from 'src/store';
import {bookDetailsSuccess, loadBookList, nextBookList} from 'src/store/actions/book.actions';
import { addFavoriteBook, deleteFavoriteBook } from '../../../store/actions/favorite.actions'
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {BookBackendService} from '../../services/book-backend.service';
import {IClient} from '../../../store/types/client';
import FavoriteBookApiDto from '../../../models/FavoriteBookApiDto';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()
  loading$: Observable<boolean>
  books$: Observable<IBook[]>
  client$: Observable<IClient>
  favoriteList$: Observable<FavoriteBookApiDto[]>

  client: IClient
  favoriteList: FavoriteBookApiDto[]

  constructor(private store: Store<State>,
              private bookBackendService: BookBackendService,
              private activatedRoute: ActivatedRoute) {
    this.books$ = store.select(selectBookList)
    this.loading$ = store.select(store => store.book.mainLoading)
    this.favoriteList$ = store.select(store => store.favorite.favoriteBookList)
    this.client$ = store.select(state => state.client?.clientInfo)
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
        this.store.dispatch(bookDetailsSuccess({bookDetails: null}))
      }
    })

    this.favoriteList$.pipe(takeUntil(this.destroy$)).subscribe(favoriteList => {
      this.favoriteList = favoriteList
    })

    this.client$.pipe(takeUntil(this.destroy$)).subscribe(client => {
      this.client = client
    })
  }

  loadNextBookList(event: MouseEvent) {
    event.preventDefault()

    this.store.dispatch(nextBookList())
  }

  onAddFavoriteClick(book: IBook, event: Event) {
    event.preventDefault()
    event.stopPropagation()

    const bookDto = FavoriteBookApiDto.toDto(book)
    const matchFound = this.favoriteList.find(favoriteBook => favoriteBook.bookId === book.id)

    if (this.client) {

      if (!matchFound) {
        this.bookBackendService.addFavoriteBook(book, this.client.id).subscribe(data => {
          this.store.dispatch(addFavoriteBook({book: bookDto}))
        })
      } else {
        this.bookBackendService.deleteFavoriteBook(book.id, this.client.id).subscribe(data => {
          this.store.dispatch(deleteFavoriteBook({bookId: book.id}))
        })
      }

    } else {
      if (!matchFound) {
        this.store.dispatch(addFavoriteBook({book: bookDto}))
      } else {
        this.store.dispatch(deleteFavoriteBook({bookId: book.id}))
      }

    }
  }

  isFavoriteBook(book: IBook) {
    return !!this.favoriteList.find(fBook => fBook.bookId === book.id);
  }

}
