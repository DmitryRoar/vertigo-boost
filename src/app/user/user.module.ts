import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SharedModule} from '../shared/shared.module'
import {SubscriptionsPageComponent} from './subscriptions-page/subscriptions-page.component'
import {SettingsPageComponent} from './settings-page/settings-page.component'
import {HistoryPageComponent} from './history-page/history-page.component'
import {UserLayoutComponent} from '../shared/components/user-layout/user-layout.component'
import {UserService} from './shared/services/user.service'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {UserChangeDataComponent} from './user-change-data/user-change-data.component'

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'subscriptions'},
      {path: 'subscriptions', component: SubscriptionsPageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'history', component: HistoryPageComponent}
    ]
  }
]

@NgModule({
  declarations: [
    SubscriptionsPageComponent,
    SettingsPageComponent,
    HistoryPageComponent,
    UserChangeDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserService],
  exports: [RouterModule]
})

export class UserModule {
}
