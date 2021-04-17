# NgBusinessHours

[![npm version](https://badge.fury.io/js/ng-business-hours.svg)](https://badge.fury.io/js/ng-business-hours)
[![License](https://img.shields.io/npm/l/local-package-publisher.svg)](https://github.com/debashish2014/local-package-publisher/blob/master/LICENSE)

An Angular component that allows you to show and manage business hours

![screenshots](https://raw.githubusercontent.com/alexsds/ng-business-hours/master/docs/screenshots/demo.png)

## Demo

https://ng-business-hours.web.app/

## Installation

To add the business hours to your Angular project:
```
npm install --save ng-business-hours
```

Once installed, add the business hours to your `app.module.ts`:
```typescript
import { NgBusinessHoursModule } from 'ng-business-hours';

...

@NgModule({
   ...
   imports: [
     ...
       NgBusinessHoursModule,
    ...
   ],
   ...
})
export class AppModule {}
```

## Sample usage

And in template file `app.component.html`:
```html
<ng-business-hours [(ngModel)]="businessHours"></ng-business-hours>
```

## License

Licensed under [MIT](http://www.opensource.org/licenses/mit-license.php)

Copyright &copy; 2021 [Alex Kovalenko](https://github.com/alexsds)
