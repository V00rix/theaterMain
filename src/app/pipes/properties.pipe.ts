import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'properties'
})
export class PropertiesPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}