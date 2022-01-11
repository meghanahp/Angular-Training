import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataType, Pagination, Product, Path } from 'src/app/models';
import { ListData } from 'src/app/models/ui/list-data';
import { ProductListTitles, ProductDataFields } from 'src/app/products/product.constant';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}