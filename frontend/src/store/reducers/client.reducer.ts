import {IClient} from '../types/client';
import {Action, createReducer, on} from '@ngrx/store';
import * as ClintActions from '../actions/client.action'

export interface State {
  clientInfo?: IClient
  isAuth: boolean
}

const initialState: State = {
  clientInfo: undefined,
  isAuth: false,
}

const _clientReducer = createReducer(
  initialState,
  on(ClintActions.setClient, (state, {client}) => {
    return {
      ...state,
      isAuth: !!client,
      clientInfo: client,
    }
  })
)

export const clientReducer = (state: State | undefined, action: Action) => {
  return _clientReducer(state, action)
}
