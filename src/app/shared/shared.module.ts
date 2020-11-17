import {NgModule, Provider} from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {LoaderComponent} from './components/loader/loader.component'
import {CommonInterceptor} from './services/common.interceptor'
import {CommonService} from './services/common.service'

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CommonInterceptor,
  multi: true
}

@NgModule({
  declarations: [LoaderComponent],
  imports: [HttpClientModule],
  providers: [INTERCEPTOR_PROVIDER, CommonService],
  exports: [HttpClientModule, LoaderComponent]
})
export class SharedModule {
}
