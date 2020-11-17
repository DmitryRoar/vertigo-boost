import {NgModule, Provider} from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {LoaderComponent} from './components/loader/loader.component'
import {AuthInterceptor} from './services/auth.interceptor'

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [LoaderComponent],
  imports: [HttpClientModule],
  providers: [INTERCEPTOR_PROVIDER],
  exports: [HttpClientModule, LoaderComponent]
})
export class SharedModule {
}
