import {Component, OnInit} from '@angular/core'
import {UserService} from '../../shared/services/user.service'

@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {

  date: Date = new Date()

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  changePrice(id) {
    this.userService.cardItems.filter(el => el.id === id ? el.open = true : null)
  }

  computerClick(id: string) {
    this.userService.computerInfo.filter(comp => comp.id === id ? comp.active = !comp.active : null)
  }
}
