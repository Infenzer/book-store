import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('https://www.googleapis.com/books')) {
      const token = localStorage.getItem('jwtToken')

      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return next.handle(req);
  }


}
