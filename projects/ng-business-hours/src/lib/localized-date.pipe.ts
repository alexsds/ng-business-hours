import {formatDate} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {NgBusinessHoursLocaleService} from './ng-business-hours-locale.service';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private localeService: NgBusinessHoursLocaleService) {
  }

  transform(value: any, pattern: string = 'E'): any {
    return formatDate(value, pattern, this.localeService.getCurrentLocale());
  }
}
