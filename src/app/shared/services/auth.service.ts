import {Injectable} from '@angular/core'
import {FbAuthResponse, INavbar, ISwal} from '../interfaces'
import {Router} from '@angular/router'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable, Subject, throwError} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

declare var Swal: ISwal

@Injectable({providedIn: 'root'})
export class AuthService {

  error$: Subject<string> = new Subject<string>()

  navbarLinks: INavbar[] = [
    {title: 'Home', link: '/'},
    {title: 'News', link: '/'},
    {title: 'Products', link: '/'},
    {title: 'Support', link: '/'},
    {title: 'Sign In', link: '/auth'}
  ]

  profileLinks: INavbar[] = []

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('fb-token')
  }

  private errorHandler(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email Not Found')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email')
        break
    }

    return throwError(error)
  }

  get isAuthenticated() {
    return !!this.token
  }

  logout() {
    this.setToken(null)
  }

  login(data): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, data)
      .pipe(
        tap(this.setToken),
        catchError(this.errorHandler.bind(this))
      )
  }

  signUp(data): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, data)
  }


  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  async success() {
    try {
      await Swal.fire('Check your Email', '', 'success')

      this.router.navigate(['/profile', 'subscriptions'])
    } catch (e) {
      await Swal.fire('Something went wrong', '', 'error')
      this.router.navigate(['/'])
    }
  }

  wrong() {
    Swal.fire('Something Went Wrong :3', '', 'error')
  }

  changeNavbarItem(change = true) {
    const navbarProfileLink: INavbar = {title: 'Profile', link: '/profile/subscriptions', changeLink: true}

    this.profileLinks = [
      {title: 'Subscriptions', link: '/profile/subscriptions'},
      {title: 'Settings', link: '/profile/settings'},
      {title: 'History', link: '/profile/history'},
      {title: 'Logout', link: '/', changeLink: true}
    ]

    this.navbarLinks.splice(-1)

    if (change) {
      this.navbarLinks.push(navbarProfileLink)
    } else {
      this.navbarLinks.push({title: 'Sign In', link: '/auth'})
    }
  }
}