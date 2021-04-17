import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgBusinessHoursComponent} from './ng-business-hours.component';

describe('NgBusinessHoursComponent', () => {
  let component: NgBusinessHoursComponent;
  let fixture: ComponentFixture<NgBusinessHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgBusinessHoursComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBusinessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
