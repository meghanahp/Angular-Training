import { Product } from "..";

export class GetProductResponse {
    products: Array<Product>;

    constructor(obj?) {
        this.products = obj ? obj : new Array<Product>()
    }
}