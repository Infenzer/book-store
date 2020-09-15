import { Action, createReducer, on } from "@ngrx/store"
import * as FilterActions from '../actions/filters.actions'

export interface IFilterState {
  new: boolean
  prev: boolean
  type: boolean
}

const initalState: IFilterState = {
  new: false,
  prev: false,
  type: false
}

const _filterReducer = createReducer(
  initalState,
  on(FilterActions.toggleFilter, (state, {filter}) => ({
    ...state,
    [filter]: !state[filter]
  }))
)

export const filterReducer = (state: IFilterState | undefined, action: Action) => {
  return _filterReducer(state, action)
}