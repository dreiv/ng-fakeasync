import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks
} from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from '../users.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class MockUserService {
  getUsers = () => Promise.resolve([]);
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let service: UsersService;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should resolve the promise and show the users list', fakeAsync(() => {
    spyOn(service, 'getUsers').and.callFake(() =>
      Promise.resolve([{ name: 'John Doe' }, { name: 'Jane Doe' }])
    );
    component.ngOnInit();

    fixture.detectChanges();
    // Resolve all Promises
    flushMicrotasks();

    fixture.detectChanges();
    const itemsCount = debugEl.queryAll(By.css('li')).length;

    expect(itemsCount).toBe(2);
  }));
});
