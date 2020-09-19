import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoriteBookLength$: Observable<number>

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.favoriteBookLength$ = this.store.select(state => state.favorite.favoriteBookList.length)
  }

}
