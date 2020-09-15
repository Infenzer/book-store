import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { State } from '..'
import { BookService } from '../../app/services/book.service'
import { EBookActions } from '../actions/book.actions'
import { EFiltersActions, toggleFilter } from '../actions/filters.actions'

@Injectable()
export class FiltersEffects {
  toggleFilters$ = createEffect(() => this.actions$.pipe(
    ofType<ReturnType<typeof toggleFilter>>(EFiltersActions.toggleFilter),
    withLatestFrom(this.store$),
    tap( ([_, state]) => this.bookService.setFilters(state.filters) ),
    map(() => ( {type: EBookActions.loadBookList} )),
  ))

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private store$: Store<State>
  ) {}
}