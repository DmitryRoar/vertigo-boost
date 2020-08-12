import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'
import {AppComponent} from './app.component'
import {HomePageComponent} from './home-page/home-page.component'
import {SignInPageComponent} from './auth/signin-page/signin-page.component'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component'
import {CreateAccountPageComponent} from './auth/create-account-page/create-page.component'
import {ErrorPageComponent} from './shared/components/error-page/error-page.component'
import {AuthGuard} from './shared/services/auth.guard'
import {UserLayoutComponent} from './shared/components/user-layout/user-layout.component'
import {ProductsPageComponent} from './products-page/products-page.component'

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
          {path: 'products', component: ProductsPageComponent},
          {
            path: 'auth', component: UserLayoutComponent, children: [
              {path: '', pathMatch: 'full', component: SignInPageComponent},
              {path: 'create-account', component: CreateAccountPageComponent},
              {path: 'reset-password', redirectTo: ''}
              // {path: 'reset-password', component: ResetPasswordPageComponent}
            ]
          },
          {path: 'profile', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]}
        ]
      }
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
