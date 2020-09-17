import { createAction, props } from '@ngrx/store'
import { IBook } from '../../models/book.models'

export enum ECartActions {
  addBook = '[CART] add book',
  deleteBook = '[CART] delete book'
}

export const addCartBook = createAction(
  ECartActions.addBook,
  props<{book: IBook}>()
)

export const deleteCartBook = createAction(
  ECartActions.deleteBook,
  props<{bookId: string}>()
)