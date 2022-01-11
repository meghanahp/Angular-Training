import { Component, Input, OnInit } from '@angular/core';
import { ListData, RowData } from 'src/app/models/ui/list-data';
import { DataType } from '../../models/constant';

@Component({
  selector: 'common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.scss']
})
export class CommonListComponent implements OnInit {
  @Input()
  listData: ListData;
  dataType = DataType;
  constructor() { }

  ngOnInit(): void {
  }

  loadMoreData = ()  => {
    alert("calld");
    if(this.listData?.getDataCallback)
    this.listData?.getDataCallback();
  }

  getDataValue(row: RowData, serverData) {
     if(serverData[row.dataField] instanceof Object) {
      return this.getObjectNthAttributeValue(serverData[row.dataField], row.targetDataFieldValue);
     }
  }

  getObjectNthAttributeValue(obj, key) {
      if(obj instanceof Object) {
          if(obj[key]) return obj[key];
          else {
            obj.keys.forEach(element => {
              if(obj[element] instanceof Object) {
              this.getObjectNthAttributeValue(obj[element], key);
              } else {
                if(element == key) {
                  return obj[element]
                }
              }
            });
          }
      }
  }
}
