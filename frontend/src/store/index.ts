import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import * as Book from './reducers/book.reducers'

export interface State {
  book: Book.State
}

export const reducers: ActionReducerMap<State> = {
  book: Book.bookReducer
}

const selectBook = createFeatureSelector<State, Book.State>('book')
export const selectBookList = createSelector(
  selectBook,
  state => state.bookList
)