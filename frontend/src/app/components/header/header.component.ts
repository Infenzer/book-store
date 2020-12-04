import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store';
import {MatDialog} from "@angular/material/dialog";
import {AuthModalComponent} from "../auth-modal/auth-modal.component";
import {setClient} from '../../../store/actions/client.action';
import {AuthService} from '../../services/auth.service';
import {addFavoriteBookList} from '../../../store/actions/favorite.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoriteBookLength$: Observable<number>
  isClientAuth: boolean

  @Output() authClick = new EventEmitter<MouseEvent>()

  constructor(private store: Store<State>,
              private dialog: MatDialog,
              private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.favoriteBookLength$ = this.store.select(state => state.favorite.favoriteBookList.length)
    this.store.select(state => state.client.isAuth).subscribe(data => {
      this.isClientAuth = data;
    })
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    this.dialog.open(AuthModalComponent);
  }

  onLogOutClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    this.store.dispatch(setClient({client: undefined}))
    this.store.dispatch(addFavoriteBookList({bookList: []}))
    this.authService.logOut()
  }

}
