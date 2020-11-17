import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {IChangeData, IConfirmEmail, ISwalInput, IUpdateEmail} from '../../shared/interfaces'
import {UserService} from '../shared/services/user.service'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthService} from 'src/app/shared/services/auth.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'

declare var Swal: ISwalInput

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {
  formEmail: FormGroup

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

  constructor(
    private user: UserService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkData()
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
        this.emailVerification = data.users[0].emailVerified
        this.emailInput = data.users[0].email

        this.formEmail = new FormGroup({
          newEmail: new FormControl(this.emailInput, [Validators.required, Validators.email])
        })

        if (data.users[0].photoUrl) {
          this.photoUrl = data.users[0].photoUrl
        } else {
          this.photoUrl = this.defaultPhotoUrl
        }
      }
    )
  }

  backEditBtn(newState) {
    this.editBtn = newState
  }

  onSubmitEmail() {
    if (this.formEmail.invalid) return

    const data: IUpdateEmail = {
      idToken: localStorage.getItem('fb-token'),
      email: this.formEmail.value.newEmail,
      returnSecureToken: true
    }
    this.user.updateData(data).subscribe(() => {
      this.user.success()
      this.router.navigate(['/auth', 'sign-in'])
    })
  }
}
