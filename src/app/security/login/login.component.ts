import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskState, Path, StorageKeys } from 'src/app/models/constant';
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
 isSubmitted = false;
 hasError = false;
 maskState = MaskState;
 maskON = MaskState.ON;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginRequest = new LoginRequest({
      password: '',
      username: ''
    });
  }

  login() {
    this.isSubmitted = true;
    this.hasError = false;
    this.authService.login().subscribe(response => {
          if(response != null) {
            let user = response.find(q => q.username == this.loginRequest.username);
            if(user != null) {
            this.isSubmitted = false;
            sessionStorage.setItem(StorageKeys.TOKEN,"eyJhbGciOiJIUzI1NiIsInR");
            this.router.navigateByUrl(Path.HOME);
            } else {
              this.hasError = true;
            }
          }
    });
  }
}
