import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { Path } from './models/constant';

const routes: Routes = [
  {
  path: Path.LOGIN,
  component: LoginComponent
  },
  {
    path: Path.HOME,
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: Path.PRODUCTS,
        loadChildren: () => import('./products/products.module').then(product => product.ProductsModule)
      },
      {
        path: Path.USERS,
        loadChildren: () => import('./users/users.module').then(users => users.UsersModule)
      },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
