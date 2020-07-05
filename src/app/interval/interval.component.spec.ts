import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { IntervalComponent } from './interval.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IntervalComponent', () => {
  let component: IntervalComponent;
  let fixture: ComponentFixture<IntervalComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntervalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment the number', fakeAsync(() => {
    const getCounterText = () =>
      debugEl.query(By.css('p')).nativeElement.textContent;

    component.ngOnInit();
    fixture.detectChanges();
    expect(getCounterText()).toBe('0');

    // Advance the clock by 1000 milliseconds
    tick(1000);
    fixture.detectChanges();
    expect(getCounterText()).toBe('50');

    // Advance the clock by 2000 milliseconds (1000 + 1000)
    tick(1000);
    fixture.detectChanges();
    expect(getCounterText()).toBe('100');
  }));
});
