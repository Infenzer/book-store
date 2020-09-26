import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AuthResponce {
  message: string
  id?: string
  token?: string
  refreshToken?: string
}

const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  modalOpen$ = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponce>(`${SERVER_URL}/api/user/register`, {
      email,
      password
    })
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponce>(`${SERVER_URL}/api/user/login`, {
      email,
      password
    })
  }

  emitChange(open: boolean) {
    this.modalOpen$.next(open)
  }
}
