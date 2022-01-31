import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonListComponent } from './common-list/common-list.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CommonListComponent, InfiniteScrollComponent, CustomLoaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CommonListComponent, InfiniteScrollComponent, CustomLoaderComponent]
})
export class StoreCommonModule { }
