import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/store';
import { toggleFilter } from 'src/store/actions/filters.actions';
import { FilterType } from '../../../models/filter.models'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  onFilterClick(event: MouseEvent, type: FilterType) {
    event.preventDefault()
    event.stopPropagation();

    (event.target as HTMLAnchorElement).classList.toggle('active')
    this.store.dispatch(toggleFilter({filter: type}))
  }

}
