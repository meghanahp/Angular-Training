import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';
import { AddEditProductRequest } from '../models/request/add-edit-product-request';
import { GetProductResponse } from '../models/response/get-product-response';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{
  productsUrl = `${this.baseApiUrl}/products`;
  constructor(private httpClient: HttpClient) {
    super();
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
}
