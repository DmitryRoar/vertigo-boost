import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {ISwalBtn} from '../../../shared/interfaces'
import {Router} from '@angular/router'

declare var Swal: ISwalBtn

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  updateData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
  }

  checkUserData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, data)
  }

  async success(msg = 'Check your Email') {
    try {
      await Swal.fire(msg, '', 'success')
    } catch (e) {
      await Swal.fire('Something went wrong', '', 'error')
      this.router.navigate(['/'])
    }
  }
}
