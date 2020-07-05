import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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
