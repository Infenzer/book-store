import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, switchMap, filter, tap, delay } from 'rxjs/operators';
import { IBook } from 'src/models/book.models';
import { BookService } from 'src/app/services/book.service';
import { parseApi } from 'src/utils/api.parsing';
import appear from '../../animations/appear'

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

  constructor(private bookService: BookService) { }

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
        switchMap(searchValue => this.bookService.getSearchBooks(searchValue, 6)),
        map(bookRes => parseApi(bookRes.items)),
        tap(() => this.loading = false)
      )
      .subscribe(bookList => this.searchResult = bookList)
  }

  onBookClick(event: any) {

  }

  onBlur(event: MouseEvent) {
    (event.target as HTMLInputElement).value = ''
    this.searchResult = []
    this.active = false
  }

}
