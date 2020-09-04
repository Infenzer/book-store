import { createAction, props } from '@ngrx/store'
import { IBook } from '../../models/book.models'

export enum EBookActions {
  loadBookList = '[BOOK API] load book list',
  loadBookListSuccess = '[BOOK API] load book list success',
  loadBookListError = '[BOOK API] load book list ERROR'
}

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
