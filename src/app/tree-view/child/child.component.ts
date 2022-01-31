import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/models/ui/tree-node';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
@Input()
data: TreeNode;
  constructor() { }

  ngOnInit(): void {
  }

  addChildren(){
    this.data.childerns.push(new TreeNode(
      {
        name: 'Child of' + this.data.name, 
        parent: this.data,
        childrens: []
      }));
  }
  
  deleteChildrens() {
    this.data.childerns = [];
  }

}
