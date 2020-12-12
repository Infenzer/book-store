import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {setClient} from '../store/actions/client.action';
import {switchMap, takeWhile, tap} from 'rxjs/operators';
import {BookBackendService} from './services/book-backend.service';
import {addFavoriteBookList} from '../store/actions/favorite.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'book-store';

  constructor(
    private authService: AuthService,
    private bookBackendService: BookBackendService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    const client = this.authService.getClient()

    if (!this.authService.hasJwtToken()) {
      return
    }

    this.authService.checkAuth().pipe(
      tap(res => console.log(res)),
      tap(result => this.logOut(result)),
      takeWhile(result => result),
      switchMap(() => this.bookBackendService.getAllFavoriteBook(client.id))
    ).subscribe(bookList => {
      this.store.dispatch(setClient({client}))
      this.store.dispatch(addFavoriteBookList({bookList}))
    })
  }

  logOut(result: boolean) {
    if (!result) {
      this.authService.logOut()
    }
  }
}
