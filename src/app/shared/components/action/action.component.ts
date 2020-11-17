import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'

import {ActionService} from '../../services/action.service'
import {IConfirmToResetPassword, IParamsForObb} from '../../interfaces'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  providers: [ActionService]
})
export class ActionComponent implements OnInit, OnDestroy {
  form: FormGroup

  confirmEmail = false
  resetPassword = false

  constructor(
    private action: ActionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      resetPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: IParamsForObb) => {
      if (params.mode === 'verifyEmail' || params.mode === 'recoverEmail') {
        this.confirmEmail = true
        this.resetPassword = false
        return this.action.confirmEmail({oobCode: params.oobCode}).subscribe()
      }
      if (params.mode === 'resetPassword') {
        this.resetPassword = true
        this.confirmEmail = false
        sessionStorage.setItem('fb-oobCode', params.oobCode)
        return this.action.verifyResetPassword({oobCode: params.oobCode}).subscribe()
      }
    })
  }

  onSubmit() {
    const data: IConfirmToResetPassword = {
      oobCode: sessionStorage.getItem('fb-oobCode'),
      newPassword: this.form.value.resetPasswordControl
    }
    this.action.passwordReset(data).subscribe(() => {
      this.router.navigate(['/auth', 'sign-in'])
    })
  }

  ngOnDestroy() {
    this.confirmEmail = false
    this.resetPassword = false
    sessionStorage.removeItem('fb-oobCode')
  }
}
