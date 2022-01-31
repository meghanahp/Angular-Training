import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatObj'
})
export class FormatObjectAsStringPipe implements PipeTransform {
  constructor() { }
  res = '';
  transform(obj: any, args: string): unknown {
    let result = '';
    if (obj != null) {
      result = this.getObjectNthAttributeValue(obj, args);
    }
    return result;
  }

  getObjectNthAttributeValue(obj, search: string): string {
    if (obj instanceof Object) {
      var objKeys = Object.keys(obj);
      let keys = search?.split(',');
      objKeys.forEach(element => {
        if (keys) {
          if (keys.includes(element)) {
            if (obj[element] instanceof Object) {
              this.getObjectNthAttributeValue(obj[element], search.replace(element, ''));
            } else {
              this.res += ' ' + obj[element];
            }
          } else {
            if (obj[element] instanceof Object) {
              this.getObjectNthAttributeValue(obj[element], search);
            }
          }
        }
        else {
          if (obj[element] instanceof Object) {
            this.getObjectNthAttributeValue(obj[element], null);
          } else {
            this.res += ' ' + obj[element];
          }
        }
      }
      );
    }
    return this.res;
  }
}
