import { Product } from "..";

export class GetProductResponse {
    products: Array<Product>;

    constructor(obj?: Array<Product>) {
        this.products = obj ? obj : new Array<Product>()
    }
}