import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  updateData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
  }

  checkUserData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, data)
  }
}
