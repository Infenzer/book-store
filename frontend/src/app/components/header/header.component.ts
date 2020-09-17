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
  cartBookLength$: Observable<number>

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.cartBookLength$ = this.store.select(state => state.cart.cartBookList.length)
  }

}
