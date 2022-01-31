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
  constructor(private router: Router,
    private authService: AuthService,
    ) {}

}
