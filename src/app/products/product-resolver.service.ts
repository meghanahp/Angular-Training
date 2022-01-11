import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from '../models';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<any>{

  constructor(private productService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    return this.productService.getAllProducts(Pagination.PAGE_SIZE);
  }
}
