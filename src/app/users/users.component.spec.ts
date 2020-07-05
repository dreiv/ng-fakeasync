import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick
} from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from '../users.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

class MockUserService {
  search = () => of([]);
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let service: UsersService;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UsersComponent],
      providers: [{ provide: UsersService, useClass: MockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(UsersService);
    fixture.detectChanges();

    debugEl = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search users', fakeAsync(() => {
    const getLoader = () => debugEl.query(By.css('.loading'));

    spyOn(service, 'search').and.callFake(() =>
      timer(100).pipe(mapTo([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
    );
    component.ngOnInit();
    fixture.detectChanges();

    // Search
    component.searchControl.patchValue('42');
    tick(100);
    fixture.detectChanges();
    expect(getLoader()).toBeTruthy();

    // Advance the clock by 100 milliseconds to run userService.search()
    tick(100);
    fixture.detectChanges();
    const itemsCount = debugEl.queryAll(By.css('li')).length;

    expect(service.search).toHaveBeenCalledTimes(1);
    expect(service.search).toHaveBeenCalledWith('42');
    expect(getLoader()).toBeFalsy();
    expect(itemsCount).toBe(2);
  }));
});
