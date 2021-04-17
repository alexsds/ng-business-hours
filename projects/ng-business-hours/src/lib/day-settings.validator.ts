import {FormGroup, ValidationErrors} from '@angular/forms';
import moment from 'moment';

export function daySettingsValidator(group: FormGroup): ValidationErrors | null {
  const isOpen = group.get('open')?.value;

  if (!isOpen) {
    return null;
  }

  const timeFrom = moment(group.get('from')?.value, 'HH:mm');
  const timeTo = moment(group.get('to')?.value, 'HH:mm');

  if (timeFrom < timeTo) {
    group.get('from')?.setErrors(null);
    group.get('to')?.setErrors(null);

    return null;
  }

  group.get('from')?.setErrors({timeToMustBeGreaterThenTimeFrom: true});
  group.get('to')?.setErrors({timeToMustBeGreaterThenTimeFrom: true});

  return {timeToMustBeGreaterThenTimeFrom: true};
}
