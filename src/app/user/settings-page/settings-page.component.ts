import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {IParamsForObb, IPasswordHash, ISwalInput} from '../../shared/interfaces'
import {UserService} from '../shared/services/user.service'
import {ActivatedRoute, Router} from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'

declare var Swal: ISwalInput

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {
  emailInput = ''

  photoUrl = ''
  defaultPhotoUrl = 'https://avatars1.githubusercontent.com/u/31390354?s=460&u=082a54d4c1305116b9b434f109d7965c26007643&v=4'

  editMail = false
  editDiscord = false
  editBtn = false

  emailVerification = false

  delayAfterConfirmEmail = false
  sendButtonError = false

  passwordHash: IPasswordHash

  constructor(
    private user: UserService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkOobCode()
    this.checkData()
    
    if (!this.photoUrl) {
      this.photoUrl = this.defaultPhotoUrl
    }
  }

  private checkOobCode() {
    this.route.queryParams.subscribe((params: IParamsForObb) => {
      if (params.oobCode) {
        this.user.updateData({ oobCode: params.oobCode }).subscribe()
      }
    })
  }

  sendOobTemp() {
    this.auth.sendOobCode({idToken: localStorage.getItem('fb-token'), requestType: 'VERIFY_EMAIL'}).subscribe(() => {
      this.delayAfterConfirmEmail = true
    }, () => {
      this.delayAfterConfirmEmail = false 
      this.sendButtonError = true
    })
  }

  async openInputForSearchUrl() {
    try {
      const SwalInput = await Swal.fire({
        title: 'Enter Image URL',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        }
      })
      if (!SwalInput.value) return
    } catch (e) {
      console.log(e)
    }
  }

  private checkData() {
    const fbToken = {
      idToken: localStorage.getItem('fb-token')
    } 
    this.user.checkUserData(fbToken).subscribe(data => {
      this.passwordHash = data.users[0].passwordHash
      this.emailVerification = data.users[0].emailVerified
      this.emailInput = data.users[0].email
    }, (error) => {
      const message = error.error.error.message
      if (message === 'TOKEN_EXPIRED') {
        this.router.navigate(['/auth'], {
          queryParams: {
            tokenExpired: true
          }
        })
      }
    })
  }

  backEditBtn(newState) {
    this.editBtn = newState
  }
}
