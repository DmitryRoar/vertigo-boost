import {Injectable} from '@angular/core'
import {ISubscriptionItem} from '../interfaces'

@Injectable()
export class UserService {
  cardItems: ISubscriptionItem[] = [
    {id: '1', open: false, version: 'Lite', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', activated: true},
    {id: '2', open: false, version: 'Standard', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', marginTrans: true, activated: true},
    {id: '3', open: false, version: 'Deluxe', code: '', pc: '', activated: false}
  ]
}
