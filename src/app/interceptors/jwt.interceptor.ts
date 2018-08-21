import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  
  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private authService: AuthService){      
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getAuthtoken() !== null) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Kinvey ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa(`${this.authService.appKey}:${this.authService.appSecret}`)}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request)
        .pipe(tap((res: HttpEvent<any>) => {

          
           if (res instanceof HttpResponse && res.url.endsWith('https://baas.kinvey.com/user/kid_Hy3D2b8IX')) {
             this.toastr.success('Successful registration.');
             this.router.navigate(['/login'])
           } else if(res instanceof HttpResponse && res.url.endsWith('https://baas.kinvey.com/user/kid_Hy3D2b8IX/login')) {
            this.saveToken(res.body);

            this.toastr.success('Successful login.');
             this.router.navigate(['/home'])
           }
        }))
  }

  private saveToken(data){
    localStorage.setItem('username', data['username']);
    localStorage.setItem('authToken', data['_kmd']['authtoken']);
    localStorage.setItem('userId', data['_id']);
  }
}
