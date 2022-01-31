export class FilterRequestDataBlk {
    pageSize: number;
    pageNumber: number;
    keyword: string;
    sortColumn: string;
    filterColumn: Array<FilterColumn>

    constructor(obj?: FilterRequestDataBlk) {
        this.pageNumber = obj?.pageNumber;
        this.pageSize = obj?.pageSize;
        this.keyword = obj?.keyword;
        this.sortColumn = obj?.sortColumn;
        this.filterColumn = obj?.filterColumn? obj.filterColumn: new Array<FilterColumn>()
    }
}

export class FilterColumn {
    id: string;
    value: string;
}