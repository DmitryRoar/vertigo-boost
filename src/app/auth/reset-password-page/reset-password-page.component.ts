import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../shared/services/auth.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  form: FormGroup

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  onSubmit() {
    this.auth.resetPassword({requestType: 'PASSWORD_RESET', email: this.form.value.email}).subscribe(() => {
      console.log('reset password')
      this.auth.success()
    }, () => {
      
    }, () => {
      this.form.reset()
    })
  }
}
