import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {AuthRes, AuthService} from 'src/app/services/auth.service';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {setClient} from '../../../store/actions/client.action';
import {BookBackendService} from '../../services/book-backend.service';
import {addFavoriteBookList} from '../../../store/actions/favorite.actions';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()
  login: string
  email: string
  password: string
  repeatPassword: string
  isRegister = false

  errorMessageActive = true
  errorMessage: string

  constructor(private authService: AuthService,
              private bookBackendService: BookBackendService,
              private modalRef: MatDialogRef<AuthModalComponent>,
              private store: Store<State>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (this.login && this.password) {
      this.authService.login(this.login, this.password)
        .pipe(
          takeUntil(this.destroy$),
          switchMap(data => {
            this.setClient(data)
            return this.bookBackendService.getAllFavoriteBook(data.id)
          })
        )
        .subscribe(favoriteBookList => {
          this.store.dispatch(addFavoriteBookList({bookList: favoriteBookList}))
        })
        // .subscribe(
        //   data => this.setClient(data),
        //   (error: HttpErrorResponse) => this.showErrorMessage(error.error.message)
        // )
    }
  }

  toggleRegistration(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    this.isRegister = !this.isRegister;
  }

  onRegisterClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (this.login && this.password === this.repeatPassword) {
      this.authService.register(this.login, this.email, this.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.isRegister = false
            console.log(data)
          },
          (error: HttpErrorResponse) => this.showErrorMessage(error.error.message)
        )
    } else {
      // Alert
      this.showErrorMessage('Ошибка валидации')
    }
  }

  clearUserData() {
    this.login = ''
    this.password = ''
    this.email = ''
    this.repeatPassword = ''
  }

  onCloseClick() {
    this.modalRef.close()
  }

  toggleErrorMessage(active?: boolean) {
    if (active) {
      this.errorMessageActive = active
    } else {
      this.errorMessageActive = !this.errorMessageActive
    }

    if (this.errorMessageActive) {
      setTimeout(() => {
        this.errorMessageActive = false;
      }, 5000)
    }
  }

  setErrorMessage(message: string) {
    this.errorMessage = message
  }

  showErrorMessage(error: string) {
    this.clearUserData();
    this.setErrorMessage(error)
    this.toggleErrorMessage(true)
  }

  setClient(authRes: AuthRes) {
    console.log(authRes)
    const client =  {
      id: authRes.id,
      username: authRes.username
    }
    this.store.dispatch(setClient({client}))
    this.authService.setClient(client.id, client.username)
    this.authService.setJwtToken(authRes.jwtToken)
    this.modalRef.close()
  }
}
