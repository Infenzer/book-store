import {createAction, props} from '@ngrx/store';
import {IClient} from '../types/client';


export enum ClientActions {
  setClient = '[CLIENT] set client',
}

export const setClient = createAction(
  ClientActions.setClient,
  props<{client: IClient}>()
)
