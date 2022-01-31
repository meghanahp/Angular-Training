import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataType, Pagination, Product, Path } from 'src/app/models';
import { FilterRequestDataBlk } from 'src/app/models/request/filter-request';
import { ListData } from 'src/app/models/ui/list-data';
import { ProductsService } from 'src/app/products/products.service';
import { UsersDataFields, UsersListTitles } from '../users-constant';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableData: ListData = new ListData();
  pageSize: number = 0;
  requestDatablk: FilterRequestDataBlk = new FilterRequestDataBlk();
  constructor(public userService: UsersService) {
    this.userService.users$.subscribe(response => {
      this.tableData.data = response;
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.requestDatablk.pageSize = Pagination.PAGE_SIZE;
    this.loadData(this.requestDatablk);
  }

  loadInitialData() {
    this.tableData = new ListData();
    this.tableData.title = "Users List";
    this.tableData.sortableColumns =
      [
        UsersListTitles.NAME,
        UsersListTitles.EMAIL,
      ];
    this.tableData.headers =
      [
        UsersListTitles.NAME,
        UsersListTitles.EMAIL,
        UsersListTitles.ADDRESS,
        UsersListTitles.PHONE
      ];
    this.tableData.dataRows = [
      {
        className: '',
        dataField: UsersDataFields.NAME,
        dataType: DataType.OBJECT,
      },
      {
        className: '',
        dataField: UsersDataFields.EMAIL,
        dataType: DataType.STRING
      },
      {
        className: '',
        dataField: UsersDataFields.ADDRESS,
        dataType: DataType.OBJECT,
        targetDataFieldValue: UsersDataFields.NUMBER + ',' + UsersDataFields.STREET + ',' + UsersDataFields.CITY + ',' + UsersDataFields.ZIPCODE
      },
      {
        className: '',
        dataField: UsersDataFields.PHONE,
        dataType: DataType.PHONE
      }
    ];
    this.tableData.getDataCallback = this.loadData.bind(this);
  }

  loadData(request: FilterRequestDataBlk) {
    this.userService.refreshData(request);
  }
}