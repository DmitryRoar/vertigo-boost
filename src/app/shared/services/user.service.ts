import {Injectable} from '@angular/core'
import {IComputerInfo, ISubscriptionItem} from '../interfaces'

@Injectable()
export class UserService {
  cardItems: ISubscriptionItem[] = [
    {id: '1', open: false, version: 'Lite', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', activated: true},
    {id: '2', open: false, version: 'Standard', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', marginTrans: true, activated: true},
    {id: '3', open: false, version: 'Deluxe', code: 'XUY', pc: 'ROAR-PC', activated: false}
  ]

  computerInfo: IComputerInfo[] = [
    {id: '1', name: 'Computer', active: true},
    {id: '2', name: 'Computer', active: false}
  ]
}
