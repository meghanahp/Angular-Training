import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonListComponent } from './common-list/common-list.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommonListComponent, InfiniteScrollComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CommonListComponent, InfiniteScrollComponent]
})
export class StoreCommonModule { }
