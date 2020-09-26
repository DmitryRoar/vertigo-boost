import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './shared/shared.module'

import {AppComponent} from './app.component'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component'
import {HomePageComponent} from './home-page/home-page.component'
import {SignInPageComponent} from './auth/signin-page/signin-page.component'
import {CreateAccountPageComponent} from './auth/create-account-page/create-page.component'
import {ResetPasswordPageComponent} from './auth/reset-password-page/reset-password-page.component'
import {ErrorPageComponent} from './shared/components/error-page/error-page.component'
import {UserLayoutComponent} from './shared/components/user-layout/user-layout.component'
import {ProductsPageComponent} from './products-page/products-page.component'
import {LoadingComponent} from './shared/components/loading/loading.component'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    SignInPageComponent,
    CreateAccountPageComponent,
    ResetPasswordPageComponent,
    ErrorPageComponent,
    UserLayoutComponent,
    ProductsPageComponent,
    LoadingComponent
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
