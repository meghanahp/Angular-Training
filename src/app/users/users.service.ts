import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models';
import { FilterRequestDataBlk } from '../models/request/filter-request';
import { ApiService } from '../services/api.service';
import { UsersDataFields, UserSort } from './users-constant';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {
  usersUrl = `${this.baseApiUrl}/users`;
  loading = false;
  currentUsers: Array<User> = new Array<User>();
  private users: Subject<Array<User>> = new Subject<Array<User>>();
  constructor(private httpClient: HttpClient) {
    super();
  }

  refreshData(requestData: FilterRequestDataBlk) {
    this.loading = true;
    this.getAllUsers(requestData?.pageNumber).subscribe(response => {
      this.loading = false;
      this.updateUsers(response);
      this.sortByUsers(requestData);
      this.filterByUsers(requestData);
    });
  }

  getAllUsers(pageSize: number): Observable<Array<User>> | Observable<any> {
    return this.httpClient.get(`${this.usersUrl}?limit=${pageSize}`);
  }

  get users$(): Subject<Array<User>> {
    return this.users;
  }

  updateUsers(data: Array<User>): void {
    this.currentUsers = data;
    this.users.next(data);
  }

  appendUsers(data: Array<User>): void {
    this.currentUsers.unshift(...data);
    this.users.next(this.currentUsers);
  }

  sortByUsers(request: FilterRequestDataBlk): void {
    request.sortColumn = request?.sortColumn ? request.sortColumn: UserSort.NAME;
    switch (request?.sortColumn) {
      case UserSort.NAME:
        this.currentUsers.sort((q, r) => {
          if (r[UsersDataFields.NAME[UsersDataFields.FNAME]] < q[UsersDataFields.NAME[UsersDataFields.FNAME]]) { return 1; }
          if (r[UsersDataFields.NAME[UsersDataFields.FNAME]] > q[UsersDataFields.NAME[UsersDataFields.FNAME]]) { return -1; }
          return 0;
        });
        break;
      case UserSort.ID:
        this.currentUsers.sort((q, r) => q[UsersDataFields.ID] - r[UsersDataFields.ID]);
        break;
      default:
        this.currentUsers.sort((q, r) => q[UsersDataFields.ID] - r[UsersDataFields.ID]);
        break;
    }
    this.updateUsers(this.currentUsers);
  }

  filterByUsers(request: FilterRequestDataBlk): void {
    let keyword = request?.keyword;
    this.currentUsers = request?.keyword ? this.currentUsers.filter(q => q.name?.firstname.toLocaleLowerCase().includes(keyword) || q.name?.lastname.toLocaleLowerCase().includes(keyword) || q.email.toLocaleLowerCase().includes(keyword) || q.phone.includes(keyword) ||
      q.username.includes(keyword)) : this.currentUsers;
    this.updateUsers(this.currentUsers);
  }
}