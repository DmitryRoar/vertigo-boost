import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProfilePageComponent} from './profile-page/profile-page.component'
import {SharedModule} from '../shared/shared.module'
import {SubscriptionsPageComponent} from './subscriptions-page/subscriptions-page.component'
import {SettingsPageComponent} from './settings-page/settings-page.component'
import {HistoryPageComponent} from './history-page/history-page.component'
import {LogoutPageComponent} from './logout-page/logout-page.component'
import {UserLayoutComponent} from '../shared/components/user-layout/user-layout.component'

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {path: '', pathMatch: 'full', component: ProfilePageComponent},
      {path: 'subscriptions', component: SubscriptionsPageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'logout', component: LogoutPageComponent}
    ]
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule {
}
