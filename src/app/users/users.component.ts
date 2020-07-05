import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchControl = new FormControl();
  loading = false;
  users$: Observable<any>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),
      tap(() => (this.loading = true)),
      switchMap((term) => this.usersService.search(term)),
      tap(() => (this.loading = false))
    );
  }
}
