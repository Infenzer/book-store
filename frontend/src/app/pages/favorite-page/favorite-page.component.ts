import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { State } from 'src/store';
import { loadBookList } from 'src/store/actions/book.actions';
import { deleteFavoriteBook } from 'src/store/actions/favorite.actions';
import { IBook } from '../../../models/book.models'

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  bookList$: Observable<IBook[]>
  loading$: Observable<boolean>
  destroy$ = new Subject()
  bookList: IBook[] = []
  totalPrice = 0

  constructor(private store: Store<State>) {
    this.bookList$ = store.select(state => state.favorite.favoriteBookList)
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookList({}))

    this.bookList$.pipe(takeUntil(this.destroy$)).subscribe(bookList => {
      this.bookList = bookList
      this.bookList.forEach(book => {
        if (book.saleInfo.saleability !== 'FOR_SALE') return

        this.totalPrice += Math.floor(book.saleInfo.retailPrice.amount)
      })
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
