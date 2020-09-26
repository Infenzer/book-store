import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthModalService, AuthResponce } from 'src/app/services/auth-modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject()
  email: string
  password: string
  repeatPassword: string
  isRegister = false

  @ViewChild('body') body: ElementRef<HTMLDivElement>

  constructor(private authModalService: AuthModalService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (this.email && this.password) {
      this.authModalService.login(this.email, this.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => this.authorization(data),
          error => {
            this.clearUserData()
          }
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

    if (this.email && this.password === this.repeatPassword) {
      this.authModalService.register(this.email, this.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => this.registration(data),
          error => {
            this.clearUserData()
          }
        )
    } else {
      // Alert
    }
  }

  clearUserData() {
    this.password = ''
    this.email = ''
    this.repeatPassword = ''
  }

  outsideBodyClick(e: MouseEvent) {
    if ( !this.body.nativeElement.contains(e.target as Node) ) {
      this.authModalService.emitChange(false)
    }
  }

  onCloseClick() {
    this.authModalService.emitChange(false)
  }

  registration(data: AuthResponce) {
    this.isRegister = false
    this.clearUserData()
  }

  authorization(data: AuthResponce) {
    this.onCloseClick()
    localStorage.setItem('id', data.id)
    localStorage.setItem('token', data.token)
    localStorage.setItem('data.refreshToken', data.refreshToken)
  }

}
