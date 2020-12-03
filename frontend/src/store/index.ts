import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import * as Book from './reducers/book.reducers'
import * as Filter from './reducers/filter.reducers'
import * as Favorite from './reducers/favorite.reducers'
import * as Client from './reducers/client.reducer'

export interface State {
  book: Book.State
  filters: Filter.IFilterState
  favorite: Favorite.IFavoriteState
  client: Client.State
}

export const reducers: ActionReducerMap<State> = {
  book: Book.bookReducer,
  filters: Filter.filterReducer,
  favorite: Favorite.favoriteReducer,
  client: Client.clientReducer,
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
