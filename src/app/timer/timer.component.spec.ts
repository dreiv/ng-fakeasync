import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let debugEl: DebugElement;
  let buttonEl: HTMLButtonElement;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugEl = fixture.debugElement;
    buttonEl = debugEl.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the message on submit and remove it after 2 seconds', fakeAsync(() => {
    const getParagraph = () => debugEl.query(By.css('p'));

    expect(getParagraph()).toBeFalsy();
    buttonEl.click();
    fixture.detectChanges();

    expect(getParagraph()).toBeTruthy();

    // Advance the virtual clock by 2 seconds
    tick(2000);
    fixture.detectChanges();

    expect(getParagraph()).toBeFalsy();
  }));
});
