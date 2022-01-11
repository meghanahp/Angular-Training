import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  constructor(private sharedService: SharedService) { 
      this.userSubscription = this.sharedService.onUpdateSession().subscribe(data => {
        console.log(data);
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
