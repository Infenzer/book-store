import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import * as Book from './reducers/book.reducers'
import * as Filter from './reducers/filter.reducers'
import * as Favorite from './reducers/favorite.reducers'

export interface State {
  book: Book.State
  filters: Filter.IFilterState
  favorite: Favorite.IFavoriteState
}

export const reducers: ActionReducerMap<State> = {
  book: Book.bookReducer,
  filters: Filter.filterReducer,
  favorite: Favorite.favoriteReducer
}

const selectBook = createFeatureSelector<State, Book.State>('book')
export const selectBookList = createSelector(
  selectBook,
  state => state.bookList
)

export const selectBookDetails = createSelector(
  selectBook,
  state => state.bookDetails
)