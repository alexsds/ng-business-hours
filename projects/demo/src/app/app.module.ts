import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgBusinessHoursModule} from '../../../ng-business-hours/src/lib/ng-business-hours.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import localeRU from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {LocaleService} from './locale.service';

registerLocaleData(localeRU);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgBusinessHoursModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LocaleService,
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.locale
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
