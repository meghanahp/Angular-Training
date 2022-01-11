import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any): unknown {
    if(value != null && value > 0) {
      return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    }
    return '--';
  }

}
