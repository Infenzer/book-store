import { createAction, props } from '@ngrx/store'
import { IBook } from '../types/book'
import FavoriteBookApiDto from '../../models/FavoriteBookApiDto';

export enum EFavoriteActions {
  addBook = '[CART] add book',
  addBookList = '[CART] add book list',
  deleteBook = '[CART] delete book'
}

export const addFavoriteBookList = createAction(
  EFavoriteActions.addBookList,
  props<{bookList: FavoriteBookApiDto[]}>()
)

export const addFavoriteBook = createAction(
  EFavoriteActions.addBook,
  props<{book: FavoriteBookApiDto}>()
)

export const deleteFavoriteBook = createAction(
  EFavoriteActions.deleteBook,
  props<{bookId: string}>()
)
