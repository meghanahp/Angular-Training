import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {
constructor(private sanitizer: DomSanitizer) {}
  transform(value: any, ...args: unknown[]): unknown {
    let result = '';
    if(value != null && value > 0) {
      let checkedStar = Math.floor(value);
      let halfCheckedStar = value - Math.floor(value);
      let emptyStar = halfCheckedStar > 0 ? (4 - checkedStar): (5 - checkedStar);
      for(let i=0;i<checkedStar;i++) {
        result += '<i class="fa fa-star"></i>';
      }
      if(checkedStar > 0) {
        result += '<i class="fa fa-star-half-o"></i>';
      }
      for(let j=0;j<emptyStar;j++){
        result += '<i class="fa fa-star-o"></i>';
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

}
