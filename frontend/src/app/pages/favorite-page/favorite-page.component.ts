import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from 'src/store';
import { deleteFavoriteBook } from 'src/store/actions/favorite.actions';
import { IBook } from '../../../store/types/book'
import deleteBook from '../../animations/deleteBook'
import FavoriteBookApiDto from '../../../models/FavoriteBookApiDto';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
  animations: [
    deleteBook
  ]
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  bookList$: Observable<FavoriteBookApiDto[]>
  loading$: Observable<boolean>
  destroy$ = new Subject()
  bookList: FavoriteBookApiDto[] = []
  totalPrice = '0'

  constructor(private store: Store<State>) {
    this.bookList$ = store.select(state => state.favorite.favoriteBookList)
  }

  ngOnInit(): void {
    this.bookList$.pipe(takeUntil(this.destroy$)).subscribe(bookList => {
      let price = 0
      this.bookList = bookList
      this.bookList.forEach(book => {
        if (book.saleability !== 'FOR_SALE') {
          return
        }

        price += book.amount || 0
      })
      this.totalPrice = price.toFixed(2)
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onDeleteClick(e: MouseEvent, bookId: string) {
    e.preventDefault()
    e.stopPropagation()

    this.store.dispatch(deleteFavoriteBook({bookId}))
  }

}
