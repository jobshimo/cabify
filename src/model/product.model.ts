export interface ProductModel {
  code  : string;
  name  : string;
  price : string;
  img   : string;
}

export class Product implements ProductModel {

  name: string;

  constructor( public code: string, name: string, public price: string, public img: string ) {
    this.name =  `Cabify ${name}`;
   }

}
