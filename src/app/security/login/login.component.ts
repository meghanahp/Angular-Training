import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Path, StorageKeys } from 'src/app/models/constant';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 loginRequest: LoginRequest;
 formGroup: FormGroup;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginRequest = new LoginRequest({
      password: '83r5^_',
      username: 'mor_2314'
    });
  }

  login() {

    // this.authService.login(this.loginRequest).subscribe(response => {
    //       if(response?.token) {
            sessionStorage.setItem(StorageKeys.TOKEN,"eyJhbGciOiJIUzI1NiIsInR");
            this.router.navigateByUrl(Path.HOME);
    //       }
    // });
  }
}
