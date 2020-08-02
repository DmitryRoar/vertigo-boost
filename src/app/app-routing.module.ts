import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'
import {AppComponent} from './app.component'
import {HomePageComponent} from './home-page/home-page.component'
import {SignInPageComponent} from './signin-page/signin-page.component'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component'
import {CreateAccountPageComponent} from './create-account-page/create-page.component'
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component'
import {AuthComponent} from './auth/auth.component'
import {ErrorPageComponent} from './error-page/error-page.component'
import {AuthGuard} from './shared/services/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {path: '', pathMatch: 'full', component: HomePageComponent},
          {
            path: 'auth', component: AuthComponent, children: [
              {path: '', pathMatch: 'full', component: SignInPageComponent},
              {path: 'create-account', component: CreateAccountPageComponent},
              {path: 'reset-password', component: ResetPasswordPageComponent}
            ]
          }
        ]
      },
      {path: 'profile', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]}
    ]
  },
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: 'error'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
