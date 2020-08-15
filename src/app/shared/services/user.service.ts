import {Injectable} from '@angular/core'
import {IComputerInfo, ISubscriptionItem} from '../interfaces'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'

@Injectable()
export class UserService {
  cardItems: ISubscriptionItem[] = [
    {id: '1', open: false, version: 'Lite', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', activated: true},
    {id: '2', open: false, version: 'Standard', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', marginTrans: true, activated: true},
    {id: '3', open: false, version: 'Deluxe', code: 'CODE HERE', pc: 'ROAR-PC', activated: false}
  ]

  computerInfo: IComputerInfo[] = [
    {id: '1', name: 'Computer', active: true},
    {id: '2', name: 'Computer', active: false}
  ]

  constructor(private http: HttpClient) {}

  updatePassword(data):Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
  }

  sendImageUrl(id, imageUrl): Observable<any> {
    return this.http.post(`${environment.fbDbUrl}/users/${id}.json`, imageUrl)
  }

  takeImageUrl(id): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/users/${id}.json`)
  }

  checkUserData(data): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, data)
  }
}
