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
  ) {
  }

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
          const {message} = error.error.error

          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/auth', 'sign-in'], {
              queryParams: {
                loginAgain: true
              }
            })
          }

          if (message === 'INVALID_OOB_CODE') {
            this.router.navigate(['/auth', 'reset-password'], {
              queryParams: {
                tryAgain: true
              }
            })
          }
          if (message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN') {
            this.router.navigate(['/auth', 'sign-in'], {
              queryParams: {
                loginAgain: true
              }
            })
            this.auth.logout()
          }
          if (message === 'TOKEN_EXPIRED') {
            this.router.navigate(['/auth'], {
              queryParams: {
                tokenExpired: true
              }
            })
          }

          return throwError(error)
        })
      )
  }
}
