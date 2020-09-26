import {Component, OnInit} from '@angular/core'
import {IComputerInfo, ISubscriptionItem} from 'src/app/shared/interfaces'

@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {
  date: Date = new Date()

  cardItems: ISubscriptionItem[] = [
    {id: '1', open: false, version: 'Lite', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', activated: true},
    {id: '2', open: false, version: 'Standard', code: '6SBVGMS9TXMK2RUP', pc: 'ALFRED-PC', marginTrans: true, activated: true},
    {id: '3', open: false, version: 'Deluxe', code: 'CODE HERE', pc: 'ROAR-PC', activated: false}
  ]

  computerInfo: IComputerInfo[] = [
    {id: '1', name: 'Computer', active: true},
    {id: '2', name: 'Computer', active: false}
  ]
  
  constructor() {}

  ngOnInit(): void {}

  changePrice(id: string) {
    this.cardItems.filter(el => el.id === id ? el.open = true : null)
  }

  computerClick(id: string) {
    this.computerInfo.filter(comp => comp.id === id ? comp.active = !comp.active : null)
  }
}
