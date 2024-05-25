import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlTags',
  standalone: true
})
export class StripHtmlTagsPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }

}
