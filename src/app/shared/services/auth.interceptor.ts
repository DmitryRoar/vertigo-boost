import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {Injectable} from '@angular/core'
import {AuthService} from './auth.service'
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated) {
      req = req.clone({
        setParams: {auth: this.auth.token}
      })
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[INTERCEPTOR]: ', error)
          if (error.status <= 400) {
            this.auth.logout()
            this.router.navigate(['/auth', 'sign-in'], {
              queryParams: {
                loginAgain: true
              }
            })
          }

          return throwError(error)
        })
      )
  }
}
