import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {IAuthData} from '../shared/interfaces'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  form: FormGroup
  message = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    const {email, password} = this.form.value
    const data: IAuthData = {
      email, password,
      returnSecureToken: true
    }

    this.authService.signUp(data).subscribe(() => {
      this.authService.success()
      this.form.reset()
    }, () => {
      this.message = 'Different password. Try again'
      this.form.reset()
    })


  }

  onChange() {
    if (!this.form.value.password.trim() === this.form.value.repeatPassword) {
      return
    }
  }
}
