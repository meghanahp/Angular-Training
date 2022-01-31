import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Path } from 'src/app/models/constant';
import { SharedService } from 'src/app/shared/shared.service';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  path = Path;
  currentSession: User;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService) {
    this.subscription = this.sharedService.onUpdateSession().subscribe(response => {
      this.currentSession = response;
    })
  }

  ngOnInit(): void {
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
