export const Path  = {
    LOGIN: 'login',
    HOME: '',
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    PRODUCTS: 'products',
    PRODUCTADDEDIT:'add-edit',
    CATEGORIES: 'categories',
    USERS: 'users',
    TREE_VIEW: 'tree-view'
}

export const DataType = {
    STRING: 'string',
    NUMBER: 'number',
    CURRENCY: 'currency',
    IMAGE: 'image',
    OBJECT: 'obj',
    PHONE: 'phone',
    RATINGS: 'ratings'

}
export const StorageKeys = {
    TOKEN: 'token',
    ADMIN: 'admin'
}

export const Pagination = {
    PAGE_SIZE: 5
}

export class Constant {
    PATH = Path;
    STORAGE_KEYS = StorageKeys;
}

export const MaskState = {
    ON: 'on',
    OFF: 'off'
}

export const MaskDataType = {
    NUMERIC: '0',
    TEXT: '1',
    ALPHANUMERIC: '2',
    ALLOWALL:'3'
}