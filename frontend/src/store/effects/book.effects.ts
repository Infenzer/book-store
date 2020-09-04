import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { BookService } from '../../app/services/book.service'
import { EBookActions } from '../actions/book.actions'
import { mergeMap, map, catchError, tap, delay } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EBookActions.loadBookList),
      mergeMap(() => this.bookService.getBooks()
        .pipe(
          delay(1000),
          tap(bookList => console.log(bookList)),
          map(bookRes => ({type: EBookActions.loadBookListSuccess, bookList: bookRes.items})),
          catchError(() => of({type: EBookActions.loadBookListError}))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}