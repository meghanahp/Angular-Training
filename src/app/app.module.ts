import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreInterceptor } from './shared/interceptors/store.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    DashboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StoreInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
