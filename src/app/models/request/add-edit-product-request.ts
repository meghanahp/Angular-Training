export class AddEditProductRequest {
    title: string;
    description: string;
    price: string;
    category: string;

    constructor(obj?: AddEditProductRequest) {
        this.title = obj?.title;
        this.description = obj?.description;
        this.price = obj?.price;
        this.category = obj?.category;
    }
}