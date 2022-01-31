import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ListData } from 'src/app/models/ui/list-data';
import { DataType, Path } from 'src/app/models/constant';
import { ProductDataFields, ProductListTitles, ProductSort } from '../product.constant';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterColumn, FilterRequestDataBlk } from 'src/app/models/request/filter-request';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableData: ListData = new ListData();
  pageSize: number = 0;
  categories: Array<string>;
  request: FilterRequestDataBlk;
  ratings = [4.0, 3.0, 2.0, 1.0];
  ProductListTitles = ProductListTitles;
  constructor(private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.productService.products$.subscribe(response => {
        this.tableData.data = response;
      });
     }

  ngOnInit(): void {
    this.loadInitialData();
    this.activatedRoute.data.subscribe((response: any) => {
      this.tableData.data = response.products;
    });
  }

  loadInitialData() {
    this.loadCategories();
    this.tableData = new ListData();
    this.tableData.isFilterEnabled = true;
    this.tableData.title = "Product List";
    this.tableData.sortableColumns = [
      ProductSort.PRICE_LOW_HIGH,
      ProductSort.PRICE_HIGH_LOW,
      ProductSort.RATINGS_HIGH_LOW,
    ],
    this.tableData.headers = 
    [
      ProductListTitles.IMAGE, 
      ProductListTitles.NAME,
      ProductListTitles.DESCRIPTION,
      ProductListTitles.PRICE,
      ProductListTitles.RATING
    ];
    this.tableData.dataRows = [
        {
          className: '',
          dataField: ProductDataFields.IMAGE,
          dataType: DataType.IMAGE
        },
        {
          className: '',
          dataField: ProductDataFields.NAME,
          dataType: DataType.STRING
        },
        {
          className: '',
          dataField: ProductDataFields.DESCRIPTION,
          dataType: DataType.STRING
        },
        {
          className: '',
          dataField: ProductDataFields.PRICE,
          dataType: DataType.CURRENCY
        },
        {
          className: '',
          dataField: ProductDataFields.RATINGOBJNAME,
          dataType: DataType.RATINGS,
          targetDataFieldValue: ProductDataFields.RATINGDATAFIELD
        },
      ];
      this.tableData.deleteCallback = this.deleteProduct.bind(this);
      this.tableData.addEditCallback = this.addEditProduct.bind(this);
      this.tableData.getDataCallback = this.loadData.bind(this);
  }

  loadData(request: FilterRequestDataBlk) {
    this.request = request;
    this.productService.refreshData(request);
  }

  deleteProduct(product: Product) {
   confirm("Are you sure about deleting product - " + product.title + "?");
    this.productService.deleteProduct(product.id).subscribe(response => {
      alert("Product Deleted ")
    })
  }

  loadCategories() {
    this.productService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }

  addEditProduct(product:Product) {
    if(product) {
      this.router.navigateByUrl(Path.PRODUCTS + '/'+Path.PRODUCTADDEDIT + '?productId=' + product?.id);
    } else {
      this.router.navigateByUrl(Path.PRODUCTS + '/'+Path.PRODUCTADDEDIT);
    }    
  }

  filterByCategory(categoryName) {
    this.request.filterColumn = [];
    this.request.filterColumn.push({
      id: ProductListTitles.CATEGORY,
      value:categoryName
    });
    this.productService.refreshData(this.request);
  }

  filterByRating(rating) {
    this.request.filterColumn = [];
    this.request.filterColumn.push({
      id: ProductListTitles.RATING,
      value: rating
    });
    this.productService.refreshData(this.request);
  }

  isFilterEnabled(columnName, value) {
   return this.request.filterColumn?.find(q => q.id == columnName && q.value == value) != null;
  }
}
