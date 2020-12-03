import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { BookService } from '../../app/services/book.service'
import { EBookActions, loadBookList, bookDetails, bookDetailsSuccess } from '../actions/book.actions'
import { mergeMap, map, tap, delay } from 'rxjs/operators'
import { parseApi } from '../../utils/api.parsing'
import { IBook } from 'src/store/types/book'

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof loadBookList>>(EBookActions.loadBookList),
      mergeMap(action => this.bookService.getBooks(action.searchValue)
        .pipe(
          delay(1000),
          tap(bookRes => console.log(bookRes)),
          map(bookRes => ( {type: EBookActions.loadBookListSuccess, bookList: parseApi(bookRes.items)} )),
          // catchError(() => of({type: EBookActions.loadBookListError}))
        )
      )
    )
  )

  nextBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.nextBookList),
      mergeMap(() => this.bookService.getNextBooks()
        .pipe(
          delay(1000),
          tap(bookRes => console.log(bookRes)),
          map(bookRes => ( {type: EBookActions.nextBookListSuccess, nextBookList: parseApi(bookRes.items)} )),
          // catchError(() => of({type: EBookActions.nextBookListError}))
        )
      )
    )
  )

  bookDetails$ = createEffect(() => this.actions$.pipe(
    ofType<ReturnType<typeof bookDetails>>(EBookActions.bookDetails),
    mergeMap(action => this.bookService.getBookDetails(action.bookId)
      .pipe(
        delay(1000),
        tap(bookDetails => console.log(bookDetails)),
        map<IBook, ReturnType<typeof bookDetailsSuccess>>(bookDetails => ({
          type: EBookActions.bookDetailsSuccess,
          bookDetails: parseApi([bookDetails])[0]
        }))
        // catchError(() => of({type: EBookActions.bookDetailsError}))
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
