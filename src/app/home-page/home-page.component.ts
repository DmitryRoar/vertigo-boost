import {Component, OnInit} from '@angular/core'
import {IPricing} from '../shared/interfaces'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public pricingList: IPricing[] = [
    {
      title: 'Lite', price: 5, privileges: [
        'Guides for Start', 'Minimalist Design',
        'Auto Steam Config', 'Bulk upload Accounts'
      ], btnTitle: 'Start Free Trial', active: false
    },
    {
      title: 'Standard', price: 9, privileges: [
        'Create Lobby', 'Display Statistics',
        'Auto Game Acceptance', 'Auto Connect / Disconnect'
      ], btnTitle: 'Get started', active: true
    },
    {
      title: 'Deluxe', price: 18, privileges: [
        'Auto Lobby', 'Auto Start Game',
        'Actual Boost Methods', 'Discounts on Accounts'
      ], btnTitle: 'Contact us', active: true
    }
  ]
  constructor() {
  }

  ngOnInit(): void {
  }

}
