import { Action, createReducer, on } from "@ngrx/store";
import * as FavoriteActions from '../actions/favorite.actions'
import FavoriteBookApiDto from '../../models/FavoriteBookApiDto';

export interface IFavoriteState {
  favoriteBookList: FavoriteBookApiDto[]
}

const initialState: IFavoriteState = {
  favoriteBookList: []
}

const _favoriteReducer = createReducer(
  initialState,

  on(FavoriteActions.addFavoriteBook, (state, {book}) => {
    return {
      ...state,
      favoriteBookList: [...state.favoriteBookList, book]
    }
  }),

  on(FavoriteActions.deleteFavoriteBook, (state, {bookId}) => {
    return {
      ...state,
      favoriteBookList: state.favoriteBookList.filter(book => book.bookId !== bookId)
    }
  }),

  on(FavoriteActions.addFavoriteBookList, (state, {bookList}) => {
    return {
      ...state,
      favoriteBookList: bookList
    }
  }),
)

export const favoriteReducer = (state: IFavoriteState | undefined, action: Action) => {
  return _favoriteReducer(state, action)
}
