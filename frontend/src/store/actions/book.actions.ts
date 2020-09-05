import { createAction, props } from '@ngrx/store'
import { IBook } from '../../models/book.models'

export enum EBookActions {
  loadBookList = '[BOOK API] load book list',
  loadBookListSuccess = '[BOOK API] load book list success',
  loadBookListError = '[BOOK API] load book list ERROR',

  nextBookList = '[BOOK API] next book list',
  nextBookListSuccess = '[BOOK API] next book list success',
  nextBookListError = '[BOOK API] next book list ERROR'
}

// loadBookList
export const loadBookList = createAction(
  EBookActions.loadBookList,
)

export const loadBookListSuccess = createAction(
  EBookActions.loadBookListSuccess,
  props<{bookList: IBook[]}>()
)

export const loadBookListError = createAction(
  EBookActions.loadBookListError
)

// nextBookList
export const nextBookList = createAction(
  EBookActions.nextBookList,
)

export const nextBookListSuccess = createAction(
  EBookActions.nextBookListSuccess,
  props<{nextBookList: IBook[]}>()
)

export const nextBookListError = createAction(
  EBookActions.nextBookListError
)