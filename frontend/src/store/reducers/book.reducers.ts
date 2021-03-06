import { IBook } from "../types/book";
import { createReducer, on } from "@ngrx/store";
import * as BookActions from '../actions/book.actions'
import { Action } from "@ngrx/store";

export interface State {
  bookList: IBook[]
  mainLoading: boolean
  detailsLoading: boolean
  bookDetails: IBook | null
}

const initialState: State = {
  bookList: [],
  mainLoading: true,
  detailsLoading: true,
  bookDetails: null
}

const _bookReducer = createReducer(
  initialState,
  on(BookActions.loadBookList, state => ({...state, bookList: [], loading: true})),
  on(BookActions.loadBookListSuccess, (state, {bookList}) => ({...state, bookList, loading: false})),

  on(BookActions.nextBookList, state => ({...state, loading: true})),
  on(BookActions.nextBookListSuccess, (state, {nextBookList}) => (
    {
      ...state,
      bookList: [...state.bookList, ...nextBookList],
      loading: false
    }
  )),

  on(BookActions.bookDetails, state => ({...state, detailsLoading: true})),
  on(BookActions.bookDetailsSuccess, (state, {bookDetails}) => ({...state, bookDetails, detailsLoading: false})),
)

export const bookReducer = (state: State | undefined, action: Action) => {
  return _bookReducer(state, action)
}
