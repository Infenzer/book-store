import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AuthResponse {
  message: string
}

interface RegisterMessage {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/auth'

  register(login: string, email: string, password: string) {
    const resEmail = email?.length ? email.length : null

    return this.http.post<RegisterMessage>(`${this.baseUrl}/register`, {
      login,
      email: resEmail,
      password
    })
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
      email,
      password
    })
  }
}
