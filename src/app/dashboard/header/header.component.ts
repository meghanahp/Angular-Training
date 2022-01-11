import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Path } from 'src/app/models/constant';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
path = Path;
currentUrl;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.router.events.pipe(filter(ev => ev instanceof NavigationEnd)). subscribe((ev => {
        this.currentUrl = ev['url'].replace('/', '');
       }));
     }

  ngOnInit(): void {
    
    this.authService.getSessionUser();
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
  }

}
