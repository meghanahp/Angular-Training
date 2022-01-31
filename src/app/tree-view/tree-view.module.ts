import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ParentComponent, ChildComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ParentComponent, ChildComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TreeViewModule { }
