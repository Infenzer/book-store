import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, switchMap, filter, tap, delay } from 'rxjs/operators';
import { IBook } from 'src/models/book.models';
import { BookService } from 'src/app/services/book.service';
import appear from '../../animations/appear'
import { Store } from '@ngrx/store';
import { State } from 'src/store';
import { loadBookList } from 'src/store/actions/book.actions';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  animations: [
    appear
  ]
})
export class SearchInputComponent implements AfterViewInit {
  searchResult: IBook[] = []
  loading = false
  active = false

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>

  constructor(private bookService: BookService, private store: Store<State>) { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(500),
        filter(searchValue => !!searchValue),
        tap(() => {
          this.loading = true
          this.searchResult = []
          this.active = true
        }),
        delay(1000),
        switchMap(searchValue => this.bookService.getBooks(searchValue, 6)),
        map(bookRes => bookRes.items),
        tap(() => this.loading = false)
      )
      .subscribe(bookList => this.searchResult = bookList)
  }

  onBookClick(event: any) {

  }

  onSearchClick() {
    if (this.searchInput.nativeElement.value) {
      const searchValue = this.searchInput.nativeElement.value

      this.store.dispatch(loadBookList({searchValue}))
    }
  }

  onBlur(event: MouseEvent) {
    (event.target as HTMLInputElement).value = ''
    this.searchResult = []
    this.active = false
  }

}
