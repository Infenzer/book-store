import { createAction, props } from '@ngrx/store'
import { IBook } from '../types/book'

export enum EFavoriteActions {
  addBook = '[CART] add book',
  deleteBook = '[CART] delete book'
}

export const addFavoriteBook = createAction(
  EFavoriteActions.addBook,
  props<{book: IBook}>()
)

export const deleteFavoriteBook = createAction(
  EFavoriteActions.deleteBook,
  props<{bookId: string}>()
)
