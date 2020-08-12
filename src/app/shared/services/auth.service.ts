import {Injectable} from '@angular/core'
import {FbAuthResponse, IAuthData, IConfirmEmail, INavbar, ISwal} from '../interfaces'
import {ActivatedRoute, Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

declare var Swal: ISwal

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
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  get token(): string {
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

  signUp(data: IAuthData): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, data)
  }

  confirmEmail(data): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
  }

  checkUserData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, data)
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }

  getIdTokenForConfirmEmail(idToken): IConfirmEmail {
    return {
      requestType: 'VERIFY_EMAIL',
      idToken
    }
  }

  get getToken() {
    const idToken = localStorage.getItem('fb-token')
    return this.getIdTokenForConfirmEmail(idToken)
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
