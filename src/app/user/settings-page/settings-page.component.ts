import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../shared/services/auth.service'
import {ISwalInput} from '../../shared/interfaces'
import {UserService} from '../../shared/services/user.service'
import {ActivatedRoute, Params} from '@angular/router'
import {switchMap} from 'rxjs/operators'

declare var Swal: ISwalInput

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {

  emailSearch = ''

  photoUrl = ''
  defaultPhotoUrl = 'https://avatars1.githubusercontent.com/u/31390354?s=460&u=082a54d4c1305116b9b434f109d7965c26007643&v=4'

  editMail = false
  editDiscord = false
  editBtn = false
  showConfirmEmail: boolean

  constructor(
    private auth: AuthService,
    private user: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.user.takeImageUrl(params['id'])
      })
    ).subscribe((image) => {
      if (image) {
        this.photoUrl = image.imageUrl
      } else {
        this.photoUrl = this.defaultPhotoUrl
      }
    })

    this.checkData()
  }

  backEditBtn(newState) {
    this.editBtn = newState
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
      this.user.sendImageUrl(this.localId, {imageUrl: SwalInput.value}).subscribe((data) => {
        console.log('%csend', 'color: red')
      })
    } catch (e) {
      console.log(e)
    }
  }

  checkData() {
    this.user.checkUserData({idToken: localStorage.getItem('fb-token')}).subscribe(data => {
      this.emailSearch = data.users[0].email
    })
  }
}
