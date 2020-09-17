import { Action, createReducer, on } from "@ngrx/store";
import { IBook } from "../../models/book.models";
import * as CartActions from '../actions/cart.actions'

export interface ICartState {
  cartBookList: IBook[]
}

const initalState: ICartState = {
  cartBookList: []
}

const _cartReducer = createReducer(
  initalState,
  on(CartActions.addCartBook, (state, {book}) => {
    return {
      ...state,
      cartBookList: [...state.cartBookList, book]
    }
  }),
  on(CartActions.deleteCartBook, (state, {bookId}) => {
    return {
      ...state,
      cartBookList: state.cartBookList.filter(book => book.id !== bookId)
    }
  })
)

export const cartReducer = (state: ICartState | undefined, action: Action) => {
  return _cartReducer(state, action)
}