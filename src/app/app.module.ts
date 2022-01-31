import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreInterceptor } from './shared/interceptors/store.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInitService } from './services/app-init.service';
import { SharedService } from './shared/shared.service';
import { environment } from 'src/environments/environment';
import { TreeViewModule } from './tree-view/tree-view.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthService } from './security/auth.service';

function initAppInitFactory(httpClient: HttpClient, sharedService: SharedService, authService: AuthService) {
  return () => {
    if (authService.isAuthenticated()) {
      return httpClient.get(environment.baseWebApiUrl + 'users?limit=1').toPromise().then(response => {
        sharedService.updateSessionUserDetails(response[0]);
      });
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    DashboardModule,
    BrowserAnimationsModule,
    TreeViewModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StoreInterceptor,
      multi: true
    },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppInitFactory,
      deps: [HttpClient, SharedService, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
