import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {IAuthData} from '../../shared/interfaces'
import {Router} from '@angular/router'
import {SwalAlertService} from '../../shared/services/swal-alert.service'

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
    private auth: AuthService,
    private swal: SwalAlertService,
    private router: Router
  ) {}

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
      this.formDisabled = false
      this.form.patchValue({
        password: '',
        repeatPassword: ''
      })
      throw new Error('Different password')
    }

    this.auth.signUp(data).subscribe(() => {
      this.formDisabled = true
      this.swal.success()
      this.router.navigate(['/auth', 'sign-in'])
      this.form.reset()
    }, () => {
      this.formDisabled = false
      this.message = 'Something went wrong. Try again'
      this.form.reset()
    })
  }
}
