import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  modalOpen$ = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.http.post('/api/user', {
      email,
      password
    }).subscribe(data => console.log(data))
  }

  register() {

  }

  emitChange(open: boolean) {
    this.modalOpen$.next(open)
  }
}
