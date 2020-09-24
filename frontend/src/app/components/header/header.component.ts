import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store';
import { AuthModalService } from '../../services/auth-modal.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoriteBookLength$: Observable<number>

  @Output() authClick = new EventEmitter<MouseEvent>()

  constructor(private store: Store<State>, private authModalService: AuthModalService) { }

  ngOnInit(): void {
    this.favoriteBookLength$ = this.store.select(state => state.favorite.favoriteBookList.length)
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.authModalService.emitChange(true);
  }

}
