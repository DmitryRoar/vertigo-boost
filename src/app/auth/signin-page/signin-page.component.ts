import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {IAuthData} from '../../shared/interfaces'

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  form: FormGroup
  error = false

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    const {email, password} = this.form.value
    const data: IAuthData = {
    email, password,
    returnSecureToken: true
    }
    this.authService.login(data).subscribe(() => {
      this.authService.success()
      this.form.reset()
    }, () => {
      this.error = true
      this.form.reset()
    })
  }
}
