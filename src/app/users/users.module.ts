import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { StoreCommonModule } from '../store-common/store-common.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [UsersComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreCommonModule,
    UserRoutingModule
  ]
})
export class UsersModule { }
