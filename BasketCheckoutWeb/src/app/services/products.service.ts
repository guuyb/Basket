import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) { }

  getProducts$() {
    // could be a runtime type check
    return this._http.get<ProductDto[]>('http://localhost:9001/products');
  }
}

export interface ProductDto {
  sku: number;
  name: string;
  description: string;
  price: number;
}
