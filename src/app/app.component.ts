import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online-Store';
  loading = false;
  constructor(private router: Router,
    private authService: AuthService,
    ) {
      this.router.events.subscribe(ev => {
        if (ev instanceof NavigationStart) {
          this.loading = true;
        }
        if (
          ev instanceof NavigationEnd ||
          ev instanceof NavigationCancel ||
          ev instanceof NavigationError
        ) {
          this.loading = false;
          this.loadUserDetails();
        }
      });   
}

  loadUserDetails() {
    this.authService.refreshSessionUserDetails();
  }
}
