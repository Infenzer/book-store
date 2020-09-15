import { createAction, props } from '@ngrx/store'
import { FilterType } from '../../models/filter.models'

export enum EFiltersActions {
  toggleFilter = '[FILTER] toggle filter',
}

export const toggleFilter = createAction(
  EFiltersActions.toggleFilter,
  props<{filter: FilterType}>()
)
