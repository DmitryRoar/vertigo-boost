import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {IAuthData, IConfirmEmail} from '../../shared/interfaces'
import {Router} from '@angular/router'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  form: FormGroup
  message = ''

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    const {email, password, repeatPassword} = this.form.value
    const data: IAuthData = {
      email, password,
      returnSecureToken: true
    }

    if (!(password.trim() === repeatPassword.trim())) {
      this.message = 'Different password. Try again'
      this.form.patchValue({
        password: '',
        repeatPassword: ''
      })
      throw new Error('Разные пароли, далбоеб')
    }

    this.authService.signUp(data).subscribe(response => {
      this.authService.success()
      this.form.reset()

      // this.authService.confirmEmail(this.authService.getToken).subscribe(() => {
      //   console.log('bussdown')
      // })
    }, () => {
      this.message = 'Something went wrong. Try again'
      this.form.reset()
    })

  }
}
