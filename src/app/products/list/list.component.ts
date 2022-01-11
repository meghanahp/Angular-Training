import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ListData, RowData } from 'src/app/models/ui/list-data';
import { DataType, Pagination, Path } from 'src/app/models/constant';
import { ProductConstants, ProductDataFields, ProductListTitles } from '../product.constant';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableData: ListData = new ListData();
  pageSize: number = 0;
  constructor(private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.activatedRoute.data.subscribe((response: any) => {
      this.tableData.data = response.products;
    });
  }

  loadInitialData() {
    this.tableData = new ListData();
    this.tableData.title = "Product List";
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
          dataType: DataType.OBJECT,
          targetDataFieldValue: ProductDataFields.RATINGDATAFIELD
        },
      ];
      this.tableData.deleteCallback = this.deleteProduct.bind(this);
      this.tableData.addEditCallback = this.addEditProduct.bind(this);
      this.tableData.getDataCallback = this.loadData.bind(this);
  }

  loadData() {
    this.productService.getAllProducts(this.pageSize + Pagination.PAGE_SIZE).subscribe(response => {
      this.tableData.data = response;
      this.pageSize = response.length;
    })
  }

  deleteProduct(product: Product) {
   confirm("Are you sure about deleting product - " + product.title + "?");
    this.productService.deleteProduct(product.id).subscribe(response => {
      alert("Product Deleted ")
    })
  }

  addEditProduct(product:Product) {
    if(product) {
      this.router.navigateByUrl(Path.PRODUCTS + '/'+Path.PRODUCTADDEDIT + '?productId=' + product?.id);
    } else {
      this.router.navigateByUrl(Path.PRODUCTS + '/'+Path.PRODUCTADDEDIT);
    }
    
  }
}
