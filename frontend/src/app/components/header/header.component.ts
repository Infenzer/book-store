import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store';
import {MatDialog} from "@angular/material/dialog";
import {AuthModalComponent} from "../auth-modal/auth-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoriteBookLength$: Observable<number>

  @Output() authClick = new EventEmitter<MouseEvent>()

  constructor(private store: Store<State>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.favoriteBookLength$ = this.store.select(state => state.favorite.favoriteBookList.length)
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    this.dialog.open(AuthModalComponent);
  }

}
