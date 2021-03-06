import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {fromEvent, Subscription, timer} from 'rxjs';
import { State } from 'src/store';
import { toggleFilter } from 'src/store/actions/filters.actions';
import { FilterType } from '../../../store/types/filter'
import {debounce, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, AfterViewInit, OnDestroy {
  scrollEvent$: Subscription

  @ViewChild('filters') filters: ElementRef<HTMLDivElement>

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.scrollEvent$ = fromEvent(window, 'scroll').subscribe(() => {
      this.onScroll()
    })
  }

  ngOnDestroy() {
    this.scrollEvent$.unsubscribe()
  }

  onScroll() {
    const hasScrollable = document.documentElement.scrollHeight > document.documentElement.offsetHeight
    if (window.scrollY > 0) {
      this.filters.nativeElement.classList.add('hidden')
    } else if (hasScrollable) {
      this.filters.nativeElement.classList.remove('hidden')
    }
  }

  onFilterClick(event: MouseEvent, type: FilterType) {
    event.preventDefault()
    event.stopPropagation();

    (event.target as HTMLAnchorElement).classList.toggle('active')
    this.store.dispatch(toggleFilter({filter: type}))
  }

}
