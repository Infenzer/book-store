import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IBook } from 'src/models/book.models';
import { BookService } from 'src/app/services/book.service';
import { parseApi } from 'src/utils/api.parsing';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  searchResult$: Observable<IBook[]> = new Observable(observer => observer.next([]))

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>

  constructor(private bookService: BookService) { }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map(event => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        if (value) {
          this.searchResult$ = this.bookService.getSearchBooks(value, 6)
            .pipe(
              map(bookRes => bookRes.items),
              map(bookList => parseApi(bookList))
            )
        }
      })
  }

  onBookClick(event: any) {

  }

  ngOnInit(): void {
  }

}
