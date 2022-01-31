import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) { }

  public checkInit() {
    return () => {
      this.httpClient.get<Observable<User>>(environment.baseWebApiUrl + 'users?limit=1').toPromise().then(response => {
        this.sharedService.updateSessionUserDetails(response);
      });
    }
  }
}
