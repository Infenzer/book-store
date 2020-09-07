import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { bookDetails } from 'src/store/actions/book.actions';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  loading$: Observable<boolean>

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) {
    this.loading$ = store.select(store => store.book.loading)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(bookDetails( {bookId: params['id']} ))
    })
  }

}
