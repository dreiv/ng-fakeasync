import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { AnimationFrameComponent } from './animation-frame.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AnimationFrameComponent', () => {
  let component: AnimationFrameComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<AnimationFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationFrameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationFrameComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    debugEl = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run requestAnimationFrame', fakeAsync(() => {
    const getContent = () =>
      debugEl.query(By.css('p')).nativeElement.textContent;

    component.value = '';
    component.ngOnInit();
    fixture.detectChanges();

    expect(getContent()).toBe('');

    tick(16);
    fixture.detectChanges();
    expect(getContent()).toBe('requestAnimationFrame');
  }));
});
