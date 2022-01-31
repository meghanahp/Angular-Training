import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPipe } from './pipes/rating.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { StoreInterceptor } from './interceptors/store.interceptor';
import { MaskDirective } from './directives/mask.directive';
import { FormatObjectAsStringPipe } from './pipes/format-object-as-string.pipe';



@NgModule({
  declarations: [ RatingPipe, CurrencyPipe, MaskDirective, FormatObjectAsStringPipe],
  imports: [
    CommonModule
  ],
  exports: [RatingPipe, CurrencyPipe, MaskDirective, FormatObjectAsStringPipe]
})
export class SharedModule { }
