import {Component, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPageComponent implements OnInit {
  editBtn = false

  constructor() {
  }

  ngOnInit(): void {
  }

  backEditBtn(newState) {
    this.editBtn = newState
  }
}
