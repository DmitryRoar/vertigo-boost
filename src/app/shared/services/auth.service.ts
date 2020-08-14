import {Injectable} from '@angular/core'
import {FbAuthResponse, IAuthData, INavbar, ISwalBtn} from '../interfaces'
import {ActivatedRoute, Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'

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
    private route: ActivatedRoute,
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

  signUp(id, data: IAuthData): Observable<any> {
    this.http.post<any>(`${environment.fbDbUrl}/users/user/${id}`, data)
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, data)
  }

  checkUserData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, data)
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
      {title: 'Settings', link: `/profile/settings/${'42'}`},
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
