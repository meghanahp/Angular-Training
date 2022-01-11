import { NgModule } from '@angular/core';
import { Path } from 'src/app/models';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from 'src/app/security/auth.guard';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
      path: Path.HOME,
      component: UsersComponent,
      canActivate: [AuthGuard],
      children: [ 
          {
              path: Path.HOME,
              component: ListComponent,
              canActivate: [AuthGuard],
          }]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
