import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { IBook } from 'src/models/book.models';
import { Store } from '@ngrx/store';
import { State, selectBookList } from 'src/store';
import { loadBookList, nextBookList } from 'src/store/actions/book.actions';
import { addCartBook } from '../../../store/actions/cart.actions'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  scrollEvent$: Subscription
  loading$: Observable<boolean>
  books$: Observable<IBook[]>
  books: IBook[]

  @ViewChild('scrollUp') scrollUp: ElementRef<HTMLDivElement>
  
  constructor(private store: Store<State>) {
    this.books$ = store.select(selectBookList)
    this.loading$ = store.select(store => store.book.loading)
  }

  ngAfterViewInit() {
    this.scrollEvent$ = fromEvent(window, 'scroll').subscribe(() => {
      this.onScroll()
    })
  }

  onScroll() {
    if (this.scrollUp) {
      if (window.scrollY > 200) {
        this.scrollUp.nativeElement.classList.remove('disabled')
      } else {
        this.scrollUp.nativeElement.classList.add('disabled')
      }
    }
  }

  ngOnDestroy() {
    this.scrollEvent$.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookList({}))
  }

  loadNextBookList(event: MouseEvent) {
    event.preventDefault()

    this.store.dispatch(nextBookList())
  }

  onAddCartClick(e: MouseEvent, book: IBook) {
    e.preventDefault()
    e.stopPropagation()

    this.store.dispatch(addCartBook({book}))
  }

  onScrollUpClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
