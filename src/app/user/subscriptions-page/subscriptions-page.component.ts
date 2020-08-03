import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service'

@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {

  date: Date = new Date()

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
