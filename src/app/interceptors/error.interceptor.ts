import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            console.log(err)
            this.toastr.error(err.error.description, "Unauthorized!");
            break;
          case 400:
            const message = Object.keys(err.error.message)
              .map(e => err.error.errors[e])
              .join('\n');
              this.toastr.error(message, 'Warning!');
            break;
          case 409:
            this.toastr.error(err.error.description, "Warning!");
            break;
        }
        return throwError(err);
      }));
  }
}
