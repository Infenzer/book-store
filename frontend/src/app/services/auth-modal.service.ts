import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AuthResponce {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  modalOpen$ = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponce>('/api/user/register', {
      email,
      password
    })
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponce>('/api/user/login', {
      email,
      password
    })
  }

  emitChange(open: boolean) {
    this.modalOpen$.next(open)
  }
}
