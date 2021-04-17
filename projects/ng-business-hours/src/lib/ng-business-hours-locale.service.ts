import {Inject, Injectable, LOCALE_ID} from '@angular/core';

@Injectable()
export class NgBusinessHoursLocaleService {
  private currentLocale: string;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.currentLocale = locale;
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  setCurrentLocale(value: string): void {
    this.currentLocale = value;
  }
}
