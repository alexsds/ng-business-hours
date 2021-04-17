import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {Subscription} from 'rxjs';
import moment from 'moment';
import {LocalizedDatePipe} from './localized-date.pipe';
import {daySettingsValidator} from './day-settings.validator';
import {NgBusinessHoursDaySettings} from './ng-business-hours-day-settings.model';

@Component({
  selector: 'ng-business-hours',
  templateUrl: './ng-business-hours.component.html',
  styleUrls: ['./ng-business-hours.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgBusinessHoursComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => NgBusinessHoursComponent),
    }
  ]
})
export class NgBusinessHoursComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() timeFromLabel: string | undefined;
  @Input() timeToLabel: string | undefined;
  @Input() validationErrorMessage: string | undefined;
  @Input() timeFrom = '09:00';
  @Input() timeTo = '18:00';
  @Input() isoWeek = true;

  val = '';
  disabled = false;
  form!: FormGroup;
  formValueChangesSubscription!: Subscription;

  startTime = '00:00';
  maxTime = '24:00';
  interval = 15;
  timeFormat = 'HH:mm';
  timeOptions!: string[];

  weekdays!: number[];
  defaultBusinessHours: NgBusinessHoursDaySettings[] = [
    {open: true, from: this.timeFrom, to: this.timeTo},
    {open: true, from: this.timeFrom, to: this.timeTo},
    {open: true, from: this.timeFrom, to: this.timeTo},
    {open: true, from: this.timeFrom, to: this.timeTo},
    {open: true, from: this.timeFrom, to: this.timeTo},
    {open: false, from: '', to: ''},
    {open: false, from: '', to: ''},
  ];
  businessHours!: NgBusinessHoursDaySettings[];

  onChange = (obj: NgBusinessHoursDaySettings[]) => {
    const values = Object.values(obj);
    this.onValuesChange(values);
  }
  onValuesChange = (value: NgBusinessHoursDaySettings[]) => {};
  onTouched = () => {};

  constructor(private localizedDatePipe: LocalizedDatePipe, private fb: FormBuilder) {
    this.weekdays = Array.from(Array(7).keys());
    this.timeOptions = this.getTimeOptions(this.startTime, this.maxTime, this.interval);
    this.businessHours = this.defaultBusinessHours;
    this.initForm();
  }

  ngOnInit(): void {
    this.formValueChangesSubscription = this.form.valueChanges.subscribe(this.onChange);
  }

  registerOnChange(fn: any): void {
    this.onValuesChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(obj: []): void {
    if (obj && obj.length > 0) {
      const values = {...obj};
      this.businessHours = values;
      this.form.setValue(values, {emitEvent: false});
    } else {
      this.form.setValue(this.defaultBusinessHours, {emitEvent: true});
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.valid) {
      return null;
    }

    return {businessHoursInvalid: true};
  }

  onChangeOperationState(i: number): void {
    if (this.disabled) {
      return;
    }

    this.businessHours[i].open = !this.businessHours[i].open;
    this.form.get(String(i))?.get('open')?.setValue(this.businessHours[i].open);

    if (this.businessHours[i].open) {
      this.form.get(String(i))?.get('from')?.setValue(this.timeFrom);
      this.form.get(String(i))?.get('to')?.setValue(this.timeTo);
    } else {
      this.form.get(String(i))?.get('from')?.setValue('');
      this.form.get(String(i))?.get('to')?.setValue('');
    }
  }

  getDateForWeekDay(num: number): Date {
    return moment().startOf(this.isoWeek ? 'isoWeek' : 'week').add(num, 'day').toDate();
  }

  private initForm(): void {
    this.form = this.fb.group({});
    let fg;
    this.weekdays.forEach((value, index) => {
      fg = this.fb.group(
        {
          open: [{value: this.businessHours[index].open, disabled: this.disabled}],
          from: [{value: this.businessHours[index].from, disabled: this.disabled}],
          to: [{value: this.businessHours[index].to, disabled: this.disabled}],
        },
        {validators: daySettingsValidator}
      );
      this.form.addControl(String(index), fg);
    });
  }

  private getTimeOptions(startTime: string, maxTime: string, interval: number): string[] {
    const start = moment(startTime, 'HH:mm');
    const max = moment(maxTime, 'HH:mm');

    const timeOptions = [];
    while (start <= max) {
      timeOptions.push(moment(start).format(this.timeFormat));
      start.add(interval, 'minutes');
    }

    return timeOptions;
  }

  ngOnDestroy(): void {
    this.formValueChangesSubscription.unsubscribe();
  }
}
