import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { ProductModel } from '../model/product.model';
import { Checkout } from '../model/checkout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  checkout: Checkout

  constructor( private ps : ProductsService) {
    this.checkout = new Checkout()
   }

  ngOnInit(): void {
    this.checkout.allProducts = this.ps.products
  }

   trackBy = (index: number, item: any) => item;
}
