import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../security/auth.service';
import { SharedService } from '../shared.service';

@Injectable()
export class StoreInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private authService: AuthService, private loaderService: SharedService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.updateIsLoading(this.requests.length > 0);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var headers = request.headers;
    const accessToken = this.authService.getToken();
    headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
    var requestClone = request.clone({headers});
    
    this.requests.push(requestClone);
    this.loaderService.updateIsLoading(true);
    return new Observable(observer => {
      const subscription = next.handle(requestClone)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(requestClone);
              observer.next(event);
            }
          },
          err => {
           // alert('error' + err);
            this.removeRequest(requestClone);
            observer.error(err);
          },
          () => {
            this.removeRequest(requestClone);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(requestClone);
        subscription.unsubscribe();
      };
    });
  }
}
