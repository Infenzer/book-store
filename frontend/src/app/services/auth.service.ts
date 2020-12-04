import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from '../../config';
import {IClient} from '../../store/types/client';

export interface AuthRes extends IClient {
  jwtToken: string
}

interface RegisterMessage {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = baseUrl + '/auth'
  public jwtToken: string;

  register(login: string, email: string, password: string) {
    const resEmail = email?.length ? email.length : null

    return this.http.post<RegisterMessage>(`${this.baseUrl}/register`, {
      login,
      email: resEmail,
      password
    })
  }

  login(login: string, password: string) {
    return this.http.post<AuthRes>(`${this.baseUrl}/login`, {
      login,
      password
    })
  }

  setJwtToken(jwtToken: string) {
    console.log(jwtToken)
    this.jwtToken = jwtToken
    localStorage.setItem('jwtToken', this.jwtToken);
  }
}