import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken')

    if (req.url.includes('https://www.googleapis.com/books') || !token) {
      return next.handle(req);
    }

    if (!req.url.includes('https://www.googleapis.com/books') && !req.url.includes('auth')) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return next.handle(req);
  }


}
