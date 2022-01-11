import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../security/auth.service';

@Injectable()
export class StoreInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var headers = request.headers;
    const accessToken = this.authService.getToken();
    headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
    var requestClone = request.clone({headers});
    return next.handle(requestClone);
  }
}
