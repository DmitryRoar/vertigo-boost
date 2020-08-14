import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../shared/services/auth.service'
import {ISwalInput} from '../../shared/interfaces'
import {UserService} from '../../shared/services/user.service'

declare var Swal: ISwalInput

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {

  emailSearch = ''
  photoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'

  editMail = false
  editDiscord = false

  editBtn = false

  showConfirmEmail: boolean

  constructor(
    private auth: AuthService,
    private user: UserService
  ) {
  }

  ngOnInit(): void {
    this.userData().subscribe(data => {
      this.showConfirmEmail = data.users[0].emailVerified
      this.emailSearch = data.users[0].email
      console.log('photoUrl', data.users[0])
      this.user.takeImageUrl().subscribe((imageUrl) => {
        console.log('takeUrl', imageUrl)
      })
    })
  }

  backEditBtn(newState) {
    this.editBtn = newState
  }

  userData() {
    const idToken = {
      idToken: localStorage.getItem('fb-token')
    }
    return this.auth.checkUserData(idToken)
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
      this.user.sendImageUrl({imageUrl: SwalInput.value}).subscribe(() => {
        console.log('send')
      })
    } catch (e) {
      console.log(e)
    }
  }
}
