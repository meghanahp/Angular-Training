import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPipe } from './pipes/rating.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { CurrencyDirective } from './directives/currency.directive';
import { StoreInterceptor } from './interceptors/store.interceptor';



@NgModule({
  declarations: [ RatingPipe, CurrencyPipe, CurrencyDirective],
  imports: [
    CommonModule
  ],
  exports: [RatingPipe, CurrencyPipe, CurrencyDirective]
})
export class SharedModule { }
