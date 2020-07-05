import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .toPromise();
  }

  search(term): Observable<any> {
    console.log('searching for', term);

    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
