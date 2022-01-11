export class ListData {
    title: string;
    headers: Array<string>;
    dataRows: Array<RowData>;
    data: Array<any>;
    getDataCallback;
    addEditCallback;
    deleteCallback;

    constructor(obj?: ListData) {
        this.title = obj?.title;
        this.headers= obj?.headers;
        this.data = obj?.data;
        this.addEditCallback = obj?.addEditCallback;
        this.deleteCallback = obj?.deleteCallback;
        this.getDataCallback = obj?.getDataCallback;
    }
}

export class RowData {
    className: string;
    dataField: string;
    dataType: string;
    targetDataFieldValue?: string;// only if data is object

    constructor(obj?) {
        this.className = obj?.className;
        this.dataField = obj?.dataField;
        this.dataType = obj?.dataType;
        this.targetDataFieldValue = obj?.targetDataFieldValue;
    }
}