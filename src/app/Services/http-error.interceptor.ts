
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              this.router.navigate(['login']);
          }
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              const status = error.error !== undefined ? error.error.status : error.status;
              const message = error.error !== undefined ? error.error.message : error.message;
              errorMessage = `Error Code: ${status}\nMessage: ${message}`;
            }
            return throwError(error.error);
          })
        );
    }
   }
