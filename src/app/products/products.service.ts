import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models';
import { AddEditProductRequest } from '../models/request/add-edit-product-request';
import { FilterRequestDataBlk } from '../models/request/filter-request';
import { GetProductResponse } from '../models/response/get-product-response';
import { ApiService } from '../services/api.service';
import { ProductDataFields, ProductListTitles, ProductSort } from './product.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService {
  productsUrl = `${this.baseApiUrl}/products`;
  currentProducts: Array<Product> = new Array<Product>();
  private products: Subject<Array<Product>> = new Subject<Array<Product>>();
  constructor(private httpClient: HttpClient) {
    super();
  }

  refreshData(requestData: FilterRequestDataBlk) {
    this.getAllProducts(requestData?.pageNumber).subscribe(response => {
      this.updateProducts(response);
      this.sortByProducts(requestData);
      this.searchByProducts(requestData);
      this.filterProducts(requestData);
    });
  }
  getAllProducts(pageSize: number): Observable<Array<Product>> | Observable<any> {
    return this.httpClient.get(`${this.productsUrl}?limit=${pageSize}`);
  }

  addProduct(request: AddEditProductRequest): Observable<object> | Observable<any> {
    return this.httpClient.post(`${this.productsUrl}`, request);
  }

  deleteProduct(productId: number): Observable<object> | Observable<any> {
    return this.httpClient.delete(`${this.productsUrl}/${productId}`);
  }

  getProduct(productId: number): Observable<Product> | Observable<any> {
    return this.httpClient.get(`${this.productsUrl}/${productId}`);
  }

  updateProduct(request: AddEditProductRequest, productId: number): Observable<object> | Observable<any> {
    return this.httpClient.put(`${this.productsUrl}/${productId}`, request);
  }

  getCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${this.productsUrl}/categories`);
  }


  get products$(): Subject<Array<Product>> {
    return this.products;
  }

  updateProducts(data: Array<Product>): void {
    this.currentProducts = data;
    this.products.next(data);
  }

  appendProducts(data: Array<Product>): void {
    this.currentProducts.unshift(...data);
    this.products.next(this.currentProducts);
  }

  sortByProducts(request: FilterRequestDataBlk): void {
    switch (request?.sortColumn) {
      case ProductSort.PRICE_HIGH_LOW:
        this.currentProducts.sort((q, r) => r[ProductDataFields.PRICE] - q[ProductDataFields.PRICE]);
        break;
      case ProductSort.PRICE_LOW_HIGH:
        this.currentProducts.sort((q, r) => q[ProductDataFields.PRICE] - r[ProductDataFields.PRICE]);
        break;
      case ProductSort.RATINGS_HIGH_LOW:
        this.currentProducts.sort((q, r) => r[ProductDataFields.RATINGOBJNAME][ProductDataFields.RATINGDATAFIELD] - q[ProductDataFields.RATINGOBJNAME][ProductDataFields.RATINGDATAFIELD]);
        break;
      default:
        this.currentProducts.sort((q, r) => q[ProductDataFields.PRICE] - r[ProductDataFields.PRICE]);
        break;

    }
    this.updateProducts(this.currentProducts);
  }

  searchByProducts(request: FilterRequestDataBlk): void {
    let keyword = request?.keyword;
    this.currentProducts = request?.keyword ? this.currentProducts.filter(q => q.category.toLocaleLowerCase().includes(keyword) || q.description.toLocaleLowerCase().includes(keyword) || q.title.toLocaleLowerCase().includes(keyword) || String(q.price).includes(keyword)) : this.currentProducts;
    this.updateProducts(this.currentProducts);
  }

  filterProducts(request: FilterRequestDataBlk) {
    if (request?.filterColumn?.length > 0) {
      let categoryRequest = request.filterColumn.find(q => q.id == ProductListTitles.CATEGORY);
      let ratingequest = request.filterColumn.find(q => q.id == ProductListTitles.RATING);
      if (categoryRequest){
        this.filterByCategory(categoryRequest.value);
      }
      if(ratingequest) {
        this.filterByUserRatings(ratingequest.value);
      }
    }
  }

  filterByCategory(keyword) {
    this.currentProducts = keyword ? this.currentProducts.filter(q => q.category.toLocaleLowerCase().includes(keyword)) : this.currentProducts;
    this.updateProducts(this.currentProducts);
  }

  filterByUserRatings(rating) {
    this.currentProducts = rating ? this.currentProducts.filter(q => q.rating?.rate >= rating && q.rating?.rate <= rating + 1) : this.currentProducts;
    this.updateProducts(this.currentProducts);
  }
}
