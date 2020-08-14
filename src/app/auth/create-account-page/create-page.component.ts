import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {IAuthData} from '../../shared/interfaces'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  form: FormGroup

  message = ''
  formDisabled = false

  constructor(
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    this.formDisabled = true
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
      throw new Error('Разные пароли')
    }

    this.authService.signUp('42', data).subscribe(response => {
      console.log('resopone', response)
      this.authService.success()
      this.form.reset()
    }, () => {
      this.formDisabled = false
      this.message = 'Something went wrong. Try again'
      this.form.reset()
    })

  }
}
