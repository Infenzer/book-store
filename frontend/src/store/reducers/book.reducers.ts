import { IBook } from "../../models/book.models";
import { createReducer, on } from "@ngrx/store";
import * as BookActions from '../actions/book.actions'
import { Action } from "@ngrx/store";

export interface State {
  bookList: IBook[]
  loading: boolean
}

const initialState: State = {
  bookList: [],
  loading: true
}

const _bookReducer = createReducer(
  initialState,
  on(BookActions.loadBookList, state => ({...state, loading: true})),
  on(BookActions.loadBookListSuccess, (state, {bookList}) => ({...state, bookList, loading: false}))

)

export const bookReducer = (state: State | undefined, action: Action) => {
  return _bookReducer(state, action)
}