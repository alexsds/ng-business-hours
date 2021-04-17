import {Component} from '@angular/core';
import {version} from '../../../../package.json';
import {LocaleService} from './locale.service';
import {NgBusinessHoursLocaleService} from '../../../ng-business-hours/src/lib/ng-business-hours-locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'demo';
  version = version;
  businessHours = [];
  disabled = false;
  isoWeek = true;
  validationErrorMessageRu = '"Начало" рабочего дня должно быть раньше чем "Конец"';

  constructor(
    private localeService: LocaleService,
    private ngBusinessHoursLocaleService: NgBusinessHoursLocaleService
  ) {
  }

  getLocale(): string {
    return this.localeService.locale;
  }

  onChangeLocale(event: any): void {
    this.localeService.locale = event.target?.value;
    this.ngBusinessHoursLocaleService.setCurrentLocale(event.target?.value);
  }
}
