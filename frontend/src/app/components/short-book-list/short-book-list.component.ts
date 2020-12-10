import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from 'src/store/types/book';

@Component({
  selector: 'app-short-book-list',
  templateUrl: './short-book-list.component.html',
  styleUrls: ['./short-book-list.component.scss']
})
export class ShortBookListComponent implements OnInit {

  @Input('title') title = ''
  @Input('bookList') bookList:IBook[] = []
  @Output() linkClick = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onlinkClick(bookId: string) {
    this.linkClick.emit(bookId)
  }

}
