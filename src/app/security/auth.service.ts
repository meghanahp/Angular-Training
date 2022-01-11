import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path, StorageKeys } from '../models/constant';
import { LoginRequest, LoginResponse, User } from '../models';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  private authUrl = this.baseApiUrl + 'auth';
  private getUserUrl = this.baseApiUrl + 'users/1';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private sharedService: SharedService) {
    super();
   }

   login(request: LoginRequest): Observable<LoginResponse> {
     return this.httpClient.post<LoginResponse>(`${this.authUrl}/login`, JSON.stringify(request));
   }

   isAuthenticated() {
     return sessionStorage.getItem(StorageKeys.TOKEN) != null;
   }

   getToken() {
    return sessionStorage.getItem(StorageKeys.TOKEN);
   }

   getSessionUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.getUserUrl}`);
   }

   refreshSessionUserDetails() {
     this.getSessionUser().subscribe(response => {
       this.sharedService.updateSessionUserDetails(response);
     })
   }

   logout() {
     sessionStorage.removeItem(StorageKeys.TOKEN);
     this.router.navigateByUrl(Path.LOGIN);
   }
}
