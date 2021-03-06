import { createAction, props } from '@ngrx/store'
import { IBook } from '../types/book'

export enum EBookActions {
  loadBookList = '[BOOK API] load book list',
  loadBookListSuccess = '[BOOK API] load book list success',
  loadBookListError = '[BOOK API] load book list ERROR',

  nextBookList = '[BOOK API] next book list',
  nextBookListSuccess = '[BOOK API] next book list success',
  nextBookListError = '[BOOK API] next book list ERROR',

  bookDetails = '[BOOK API] book details',
  bookDetailsSuccess = '[BOOK API] book details success',
  bookDetailsError = '[BOOK API] book details ERROR',
}

// loadBookList
export const loadBookList = createAction(
  EBookActions.loadBookList,
  props<{searchValue?: string}>()
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

// bookDetails
export const bookDetails = createAction(
  EBookActions.bookDetails,
  props<{bookId: string}>()
)

export const bookDetailsSuccess = createAction(
  EBookActions.bookDetailsSuccess,
  props<{bookDetails: IBook}>()
)

export const bookDetailsError = createAction(
  EBookActions.bookDetailsError
)
