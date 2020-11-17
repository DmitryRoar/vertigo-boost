import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../shared/services/auth.service'
import {IAuthData} from '../../shared/interfaces'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {SwalAlertService} from '../../shared/services/swal-alert.service'

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  form: FormGroup

  formDisabled = false
  error = false

  errorMsg = ''

  constructor(
    private auth: AuthService,
    private swal: SwalAlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['signInAgain']) {
        this.errorMsg = 'Something went wrong! Try again'
      }
    })

    this.auth.logout()
  }

  onSubmit() {
    this.formDisabled = true
    const {email, password} = this.form.value
    const data: IAuthData = {
      email, password,
      returnSecureToken: true
    }
    this.auth.login(data).subscribe(() => {
      this.router.navigate(['/profile', 'subscriptions'])
      this.swal.success('Welcome')
    }, () => {
      this.error = true
      this.formDisabled = false
      this.form.reset()
    }, () => {
      this.form.reset()
      this.error = false
      this.formDisabled = false
    })
  }
}
