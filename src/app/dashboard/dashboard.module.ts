import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DashboardComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [HeaderComponent, FooterComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
