import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  burgerOpen = false
  selectorOpen = false
  mobileSelectorOpen = false

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.auth.changeNavbarItem()
    }
  }

  profileMenuClick(logoutLink) {
    this.selectorOpen = false

    if (logoutLink) {
      this.auth.logout()
      this.auth.changeNavbarItem(false)
    }
  }
}
