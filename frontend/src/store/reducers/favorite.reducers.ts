import { Action, createReducer, on } from "@ngrx/store";
import { IBook } from "../../models/book.models";
import * as FavoriteActions from '../actions/favorite.actions'

export interface IFavoriteState {
  favoriteBookList: IBook[]
}

const initalState: IFavoriteState = {
  favoriteBookList: []
}

const _favoriteReducer = createReducer(
  initalState,
  on(FavoriteActions.addFavoriteBook, (state, {book}) => {
    return {
      ...state,
      favoriteBookList: [...state.favoriteBookList, book]
    }
  }),
  on(FavoriteActions.deleteFavoriteBook, (state, {bookId}) => {
    return {
      ...state,
      favoriteBookList: state.favoriteBookList.filter(book => book.id !== bookId)
    }
  })
)

export const favoriteReducer = (state: IFavoriteState | undefined, action: Action) => {
  return _favoriteReducer(state, action)
}