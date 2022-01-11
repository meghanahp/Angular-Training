import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { StoreCommonModule } from '../store-common/store-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ListComponent, AddEditComponent, ProductsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreCommonModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
