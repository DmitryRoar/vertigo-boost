import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {IConfirmToResetPassword, IParamsForObb} from '../interfaces'

@Injectable()
export class ActionService {
  constructor(private http: HttpClient) {
  }

  confirmEmail(data: IParamsForObb): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
  }

  verifyResetPassword(data: IParamsForObb) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${environment.apiKey}`, data)
  }

  passwordReset(data: IConfirmToResetPassword) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${environment.apiKey}`, data)
  }
}
