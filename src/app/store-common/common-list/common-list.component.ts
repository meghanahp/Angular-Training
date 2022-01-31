import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ListData, RowData } from 'src/app/models/ui/list-data';
import { DataType, Pagination } from '../../models/constant';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterRequestDataBlk } from 'src/app/models/request/filter-request';
@Component({
  selector: 'common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.scss']
})
export class CommonListComponent implements OnInit {
  @Input()
  listData: ListData;
  dataType = DataType;
  request: FilterRequestDataBlk = new FilterRequestDataBlk();
  searchVal: Subject<string> = new Subject<string>();
  constructor() { }

  ngOnInit(): void {
    this.request.pageSize = Pagination.PAGE_SIZE;
    this.loadMoreData();
    this.searchVal.pipe(debounceTime(200), distinctUntilChanged()).subscribe(key => {
      this.request.keyword = key;
      this.loadMoreData();
    })
  }

  loadMoreData = ()  => {
    if(this.listData?.getDataCallback)
    this.listData?.getDataCallback(this.request);
  }

  searchData(keyword) {
    this.searchVal.next(keyword);
  }

  sortData(val) {
    this.request.sortColumn = val;
    if(this.listData?.getDataCallback)
    this.listData?.getDataCallback(this.request);
  }
}
