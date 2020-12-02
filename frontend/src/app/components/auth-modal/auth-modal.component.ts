import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthModalService } from 'src/app/services/auth-modal.service';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private authModalService: AuthModalService, private modalRef: MatDialogRef<AuthModalComponent>) { }

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
      this.authModalService.login(this.login, this.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => this.authModalService.setJwtToken(data.message),
          (error: HttpErrorResponse) => this.showErrorMessage(error.error.message)
        )
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
      this.authModalService.register(this.login, this.email, this.password)
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
}
