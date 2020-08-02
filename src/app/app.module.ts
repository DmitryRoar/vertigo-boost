import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AppRoutingModule} from './app-routing.module'

import {AppComponent} from './app.component'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component'
import {HomePageComponent} from './home-page/home-page.component'
import {SignInPageComponent} from './signin-page/signin-page.component'
import {CreateAccountPageComponent} from './create-account-page/create-page.component'
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component'
import {AuthComponent} from './auth/auth.component'
import {ErrorPageComponent} from './error-page/error-page.component'
import {HistoryPageComponent} from './user/history-page/history-page.component'
import {LogoutPageComponent} from './user/logout-page/logout-page.component'
import {SharedModule} from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    SignInPageComponent,
    CreateAccountPageComponent,
    ResetPasswordPageComponent,
    AuthComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
