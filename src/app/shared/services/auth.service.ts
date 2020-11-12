import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'

import {environment} from '../../../environments/environment'
import {
  FbAuthResponse,
  IAuthData,
  IConfirmEmail,
  INavbar,
  IResetPassword,
  ISendOobCode,
  ISignUp,
  ISwalBtn
} from '../interfaces'


declare var Swal: ISwalBtn

@Injectable({providedIn: 'root'})
export class AuthService {

  navbarLinks: INavbar[] = [
    {title: 'Home', link: '/'},
    {title: 'News', link: '/'},
    {title: 'Products', link: '/products'},
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

  get isAuthenticated() {
    return !!this.token
  }

  logout() {
    this.setToken(null)
  }

  login(data: IAuthData): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, data)
      .pipe(
        tap(this.setToken)
      )
  }

  signUp(data: IAuthData): Observable<ISignUp> {
    return this.http.post<ISignUp>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, data)
      .pipe(
        switchMap((response: ISignUp): Observable<any> => {
          return this.sendOobCode({idToken: response.idToken, requestType: 'VERIFY_EMAIL'})
        })
      )
  }

  sendOobCode(data: IConfirmEmail): Observable<ISendOobCode> {
    return this.http.post<ISendOobCode>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, data)
  }

  resetPassword(data: IResetPassword): Observable<ISendOobCode> {
    return this.http.post<ISendOobCode>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, data)
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(Date.now() + +response.expiresIn * 3600)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  async success(msg = 'Check your Email') {
    try {
      await Swal.fire(msg, '', 'success')
      this.router.navigate(['/profile', 'subscriptions'])
    } catch (e) {
      await Swal.fire('Something went wrong', '', 'error')
      this.router.navigate(['/'])
    }
  }

  changeNavbarItem(change = true) {
    const navbarProfileLink: INavbar = {title: 'Profile', link: '/profile/subscriptions', changeLink: true}

    this.profileLinks = [
      {title: 'Subscriptions', link: '/profile/subscriptions'},
      {title: 'Settings', link: `/profile/settings`},
      {title: 'FAQ', link: '/profile/history'},
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
