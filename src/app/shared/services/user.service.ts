import {Injectable} from '@angular/core'
import {ISubscriptionItem} from '../interfaces'

@Injectable()
export class UserService {
  cardItems: ISubscriptionItem[] = [
    {version: 'Lite', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC'},
    {version: 'Standard', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', marginTrans: true},
    {version: 'Deluxe', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC'}
  ]
}
