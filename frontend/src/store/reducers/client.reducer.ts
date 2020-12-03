import {IClient} from '../types/client';
import {Action, createReducer, on} from '@ngrx/store';
import * as ClintActions from '../actions/client.action'

export interface State {
  clientInfo: IClient
}

const initialState: State | undefined = undefined

const _clientReducer = createReducer(
  initialState,
  on(ClintActions.setClient, (state, {client}) => ({...state, clientInfo: client}))
)

export const clientReducer = (state: State | undefined, action: Action) => {
  return _clientReducer(state, action)
}
