import { Product, ProductModel } from './product.model';



export interface CheckoutModel {
  /**
   * Scans a product adding it to the current cart.
   * @param code The product identifier
   * @returns itself to allow function chaining
   */
  scan(code: string): this;

  /**
   * Returns the value of all cart products with the discounts applied.
   */
  total(): number;
}


export class Checkout implements CheckoutModel {


      allProducts: ProductModel[] = [];

      myCart: ProductModel[] = [ new Product("X7R2OPX", "T-Shirt", "20.00€", "shirt.png"),
      new Product("X7R2OPX", "T-Shirt", "20.00€", "shirt.png"),
      new Product("X7R2OPX", "T-Shirt", "20.00€", "shirt.png"),
      new Product("X2G2OPZ", "Coffee Mug", "5.00€", "mug.png"),
    ]

     private MUGDiscount = ( cart:ProductModel[] ) => {
          let price: number = 0;
          let mug: number = 0;
          for (let i = 0; i < cart.length; i++) {
              ( cart[i].code === "MUG" ) &&  mug++;
              if((price === 0) && ( cart[i].code === "MUG" )) price = + cart[i].price.slice(0, -1);
          }
          let total = mug % 2 === 0 ? mug / 2: ((mug -1) / 2) + 1;
          return total * price
      }

      private TSHIRTDiscount = ( cart:ProductModel[] ) => {
          let price: number = 0;
          let tshirt: number = 0;
          for (let i = 0; i < cart.length; i++) {
              ( cart[i].code === "TSHIRT" ) &&  tshirt++
              if((price === 0) && ( cart[i].code === "TSHIRT" )) price = + cart[i].price.slice(0, -1);
          }
          return (tshirt >= 3) ? tshirt* 19 : tshirt * price
      }

      private RESTProducts = ( cart:ProductModel[] ) => {
          let price = 0;
          const restCart: ProductModel[] = cart.map( (product: ProductModel) =>  ((product.code != "MUG") && (product.code != "TSHIRT")  &&  product  ))
          if(restCart.length > 0) price = + cart[0].price.slice(0, -1)
          return restCart.length * price
      }

       getProductCount = ( code:string ) => {
        let product: number = 0;
        for (let i = 0; i < this.myCart.length; i++) {
            ( this.myCart[i].code === code ) &&  product++;
        }
        return product
       }



          scan(code: string): this {
             const productToAdd = this.allProducts.find(product => product.code === code)
             let newCart : ProductModel[]  = [...this.myCart]
             newCart.push(productToAdd)
             this.myCart = newCart
             return this
          }


          total(): number {
              return  this.MUGDiscount(this.myCart) + this.TSHIRTDiscount(this.myCart) + this.RESTProducts(this.myCart)
          }


}
