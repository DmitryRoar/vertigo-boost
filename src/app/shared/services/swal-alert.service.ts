import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {ISwalBtn} from '../interfaces'

declare var Swal: ISwalBtn

@Injectable({providedIn: 'root'})
export class SwalAlertService {
  constructor(private router: Router) {
  }

  async success(msg = 'Check your Email') {
    try {
      await Swal.fire(msg, '', 'success')
    } catch (e) {
      await Swal.fire('Something went wrong', '', 'error')
      this.router.navigate(['/'])
    }
  }
}
