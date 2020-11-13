import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params) sessionStorage.setItem('email-verificated', JSON.stringify(params))
    })
  }
}
