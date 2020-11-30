import {Component, EventEmitter, InjectionToken, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store';
import { AuthModalService } from '../../services/auth-modal.service'
import {MatDialog} from "@angular/material/dialog";
import {AuthModalComponent} from "../auth-modal/auth-modal.component";
import {NoopScrollStrategy, ScrollStrategy} from "@angular/cdk/overlay";

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
    // this.authModalService.emitChange(true);
  }

}
