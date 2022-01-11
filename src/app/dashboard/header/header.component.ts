import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Path } from 'src/app/models/constant';

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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
        this.currentUrl = url;
    })
    this.authService.getSessionUser();
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
  }

}
