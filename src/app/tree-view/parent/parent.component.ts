import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/models/ui/tree-node';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
nodes: Array<TreeNode> = new Array<TreeNode>();
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Array<TreeNode>>('assets/data/tree-data.json').subscribe(response => {
      response.forEach(node => {
        this.nodes.push(new TreeNode(node));
      });
    })
  }

}
