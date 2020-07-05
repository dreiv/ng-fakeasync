import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ListComponent } from './list.component';
import { UsersService } from '../users.service';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, timer } from 'rxjs';
import { By } from '@angular/platform-browser';
import { mapTo } from 'rxjs/operators';

class MockUserService {
  search = () => of([]);
}

describe('ListComponent', () => {
  let component: ListComponent;
  let service: UsersService;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ListComponent],
      providers: [{ provide: UsersService, useClass: MockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
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
