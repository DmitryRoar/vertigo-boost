import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../shared/services/auth.service'
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {

  editMail = false
  editDiscord = false
  editBtn = false

  showConfirmEmail: boolean

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.checkQueryParamsForConfirmEmail()
    const oobCode = localStorage.getItem('fb-oobCode')
    if (oobCode) {
      this.auth.confirmEmail({oobCode}).subscribe(data => {
        console.log(data)
      })
    }

    this.userData().subscribe(data => {
      this.showConfirmEmail = data.users[0].emailVerified
    })
  }

  backEditBtn(newState) {
    this.editBtn = newState
  }

  changeInput() {
    console.log('hello')
  }

  checkQueryParamsForConfirmEmail() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.oobCode) {
        localStorage.setItem('fb-oobCode', params.oobCode)
      }
    })
  }

  userData() {
    const idToken = {
      idToken: localStorage.getItem('fb-token')
    }
    return this.auth.checkUserData(idToken)
  }
}
