import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {UserService} from '../../shared/services/user.service'
import {IUpdatePassword} from '../../shared/interfaces'
import {AuthService} from '../../shared/services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-change-data',
  templateUrl: './user-change-data.component.html',
  styleUrls: ['./user-change-data.component.scss']
})
export class UserChangeDataComponent implements OnInit {

  @Input() prevState: boolean
  @Output() newState = new EventEmitter()

  form: FormGroup
  error = false

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  onSubmit() {
    const {newPassword, repeatPassword} = this.form.value
    const idToken = localStorage.getItem('fb-token')
    const data: IUpdatePassword = {
      idToken,
      password: newPassword,
      returnSecureToken: true
    }

    if (!(newPassword.trim() === repeatPassword.trim())) {
      this.error = true
      this.form.reset()
      throw new Error('Разные пароли')
    }
    this.userService.updatePassword(data).subscribe(() => {
      this.auth.logout()
      this.router.navigate(['/auth'])

      this.newState.emit(this.prevState = false)
      this.form.reset()
    }, error => {
      this.error = true
      this.form.reset()
    })
  }
}
