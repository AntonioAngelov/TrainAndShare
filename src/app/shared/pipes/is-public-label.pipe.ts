import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPublicLabel'
})
export class IsPublicLabelPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) {
      return 'Public training';
    } else {
      return 'Private training';
    }
  }

}
