import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../shared/services/auth.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Params} from '@angular/router'
import {SwalAlertService} from '../../shared/services/swal-alert.service'

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  form: FormGroup
  message: string

  constructor(
    private auth: AuthService,
    private swal: SwalAlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['tryAgain']) {
        this.message = 'Something went wrong. Try again'
      }
    })
  }

  onSubmit() {
    this.auth.resetPassword({requestType: 'PASSWORD_RESET', email: this.form.value.email}).subscribe(() => {
      this.swal.success()
    }, () => {

    }, () => {
      this.form.reset()
    })
  }
}
