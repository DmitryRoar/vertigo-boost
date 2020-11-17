import {Injectable} from '@angular/core'
import {IConfirmEmail, ISendOobCode} from '../interfaces'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {HttpClient} from '@angular/common/http'

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) {
  }

  sendOobCode(data: IConfirmEmail): Observable<ISendOobCode> {
    return this.http.post<ISendOobCode>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, data)
  }
}
