import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public isLoading = new BehaviorSubject(false);
  private sessionUserSubject =new BehaviorSubject<User>(null);
  constructor() { }

  updateSessionUserDetails(sessionData): void {
    this.sessionUserSubject.next(sessionData);
  }

  onUpdateSession(): Observable<User>{
    return this.sessionUserSubject.asObservable();
  }  
  
  updateIsLoading(val): void {
    this.isLoading.next(val);
  }

  onUpdateIsLoading(): Observable<boolean>{
    return this.isLoading.asObservable();
  }  
}
