import { Injectable } from '@angular/core';
import { ProductModel, Product } from '../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  products: ProductModel[] = [
    new Product("X7R2OPX", "T-Shirt", "20.00€", "shirt.png"),
    new Product("X2G2OPZ", "Coffee Mug", "5.00€", "mug.png"),
    new Product("X3W2OPY", "Cap", "10.00€", "cap.png")
  ]

}
