import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from 'src/store';
import { deleteFavoriteBook } from 'src/store/actions/favorite.actions';
import { IBook } from '../../../models/book.models'
import deleteBook from '../../animations/deleteBook'

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
  animations: [
    deleteBook
  ]
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  bookList$: Observable<IBook[]>
  loading$: Observable<boolean>
  destroy$ = new Subject()
  bookList: IBook[] = []
  totalPrice = '0'

  constructor(private store: Store<State>) {
    this.bookList$ = store.select(state => state.favorite.favoriteBookList)
  }

  ngOnInit(): void {
    this.bookList$.pipe(takeUntil(this.destroy$)).subscribe(bookList => {
      let price = 0
      this.bookList = bookList
      this.bookList.forEach(book => {
        if (book.saleInfo.saleability !== 'FOR_SALE') return

        price += book.saleInfo.retailPrice.amount
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
