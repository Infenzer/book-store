import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import * as Book from './reducers/book.reducers'
import * as Filter from './reducers/filter.reducers'
import * as Cart from './reducers/cart.reducers'

export interface State {
  book: Book.State
  filters: Filter.IFilterState
  cart: Cart.ICartState
}

export const reducers: ActionReducerMap<State> = {
  book: Book.bookReducer,
  filters: Filter.filterReducer,
  cart: Cart.cartReducer
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