import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {IChangeData, IConfirmEmail, IParamsForObb, IPasswordHash, ISwalInput} from '../../shared/interfaces'
import {UserService} from '../shared/services/user.service'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthService} from 'src/app/shared/services/auth.service'

declare var Swal: ISwalInput

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {
  emailInput = ''

  confirmationLinkText = 'Confirmation link has been sent to your email!'

  photoUrl = ''
  defaultPhotoUrl = 'https://avatars1.githubusercontent.com/u/31390354?s=460&u=082a54d4c1305116b9b434f109d7965c26007643&v=4'

  editMail = false
  editDiscord = false
  editBtn = false

  emailVerification = false

  delayAfterConfirmEmail = false
  sendButtonError = false

  errorImageUrl = false

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
        this.user.updateData({oobCode: params.oobCode}).subscribe()
      }
    })
  }

  sendOobOnMail() {
    this.delayAfterConfirmEmail = true

    const data: IConfirmEmail = {
      idToken: localStorage.getItem('fb-token'),
      requestType: 'VERIFY_EMAIL'
    }
    this.auth.sendOobCode(data).subscribe(() => {
      this.confirmationLinkText = 'A confirmation link has been sent to your email'
    }, () => {
      this.delayAfterConfirmEmail = false
      this.sendButtonError = true
      this.confirmationLinkText = 'Something went wrong. Try later!'
    })
  }

  async openInputForSearchUrl() {
    try {
      const reg = /(https?:\/\/.*\.(?:png|jpg|jpeg|webmp))/gim
      const SwalInput = await Swal.fire({
        title: 'Enter Image URL',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        }
      })
      const photoUrl = SwalInput.value

      if (reg.test(photoUrl)) {
        const data: IChangeData = {
          idToken: localStorage.getItem('fb-token'),
          photoUrl,
          displayName: null,
          deleteAttribute: null,
          returnSecureToken: true
        }
        this.user.updateData(data).subscribe((newData) => {
          this.photoUrl = newData.photoUrl
        })

        this.errorImageUrl = false
      } else {
        Swal.close()
        this.errorImageUrl = true
      }
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

      if (data.users[0].photoUrl) {
        this.photoUrl = data.users[0].photoUrl
      }
    }, (error) => {
      const {message} = error.error.error
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
