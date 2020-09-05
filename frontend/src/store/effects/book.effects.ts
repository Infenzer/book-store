import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { BookService } from '../../app/services/book.service'
import { EBookActions } from '../actions/book.actions'
import { mergeMap, map, catchError, tap, delay } from 'rxjs/operators'
import { of } from 'rxjs'
import { parseApi } from '../../utils/api.parsing'

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EBookActions.loadBookList),
      mergeMap(() => this.bookService.getBooks()
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

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}