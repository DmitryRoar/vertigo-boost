import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {LoaderComponent} from './components/loader/loader.component'

@NgModule({
  declarations: [LoaderComponent],
  imports: [HttpClientModule],
  exports: [HttpClientModule, LoaderComponent]
})
export class SharedModule {
}
