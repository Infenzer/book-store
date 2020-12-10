import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, switchMap, filter, tap, delay } from 'rxjs/operators';
import { IBook } from 'src/store/types/book';
import { BookService } from 'src/app/services/book.service';
import appear from '../../animations/appear'
import { Router } from '@angular/router';

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

  constructor(private bookService: BookService, private router: Router) { }

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

  onBookClick(id: string) {
    this.router.navigate(['book', id])
  }

  onSearchClick(e: MouseEvent) {
    if (this.searchInput.nativeElement.value) {
      const searchValue = this.searchInput.nativeElement.value
      this.router.navigate(
        [''],
        {
          queryParams: {searchValue}
        }
      )
    }
  }

  onBlur(event: MouseEvent) {
    (event.target as HTMLInputElement).value = ''
    this.searchResult = []
    this.active = false
  }

}
