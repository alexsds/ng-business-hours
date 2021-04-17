import {NgModule} from '@angular/core';
import {NgBusinessHoursComponent} from './ng-business-hours.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocalizedDatePipe} from './localized-date.pipe';
import {NgBusinessHoursLocaleService} from './ng-business-hours-locale.service';

@NgModule({
  declarations: [
    NgBusinessHoursComponent,
    LocalizedDatePipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [
    NgBusinessHoursComponent,
  ],
  providers: [
    LocalizedDatePipe,
    NgBusinessHoursLocaleService,
  ]
})
export class NgBusinessHoursModule { }
