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

      myCart: ProductModel[] = []

     private MUGDiscount = ( cart:ProductModel[] ) : number => {
          let price: number = 0;
          let mug: number = 0;
          for (let i = 0; i < cart.length; i++) {
              ( cart[i].code === "X2G2OPZ" ) &&  mug++;
              if((price === 0) && ( cart[i].code === "X2G2OPZ" )) price = + cart[i].price.slice(0, -1);
          }
          let total = mug % 2 === 0 ? mug / 2: ((mug -1) / 2) + 1;
          return total * price;
      }

      private TSHIRTDiscount = ( cart:ProductModel[] ) : number => {
          let price: number = 0;
          let tshirt: number = 0;
          for (let i = 0; i < cart.length; i++) {
              ( cart[i].code === "X7R2OPX" ) &&  tshirt++
              if((price === 0) && ( cart[i].code === "X7R2OPX" )) price = + cart[i].price.slice(0, -1);
          }
          return (tshirt >= 3) ? tshirt* 19 : tshirt * price;
      }

      private RESTProducts = ( cart:ProductModel[] ) : number => {
          let price = 0;
          // const restCart: ProductModel[] = [...cart.map( (product: ProductModel) =>  ((product.code != "X2G2OPZ") && (product.code != "X7R2OPX")  ) ? product : null)]
          const restCart: ProductModel[] = []
          for (let i = 0; i < cart.length; i++) {
            cart[i].code != "X2G2OPZ" && cart[i].code != "X7R2OPX" && restCart.push(cart[i])
            if(price === 0 && cart[i].code != "X2G2OPZ" && cart[i].code != "X7R2OPX")  price = + cart[i].price.slice(0, -1);

          }
          // if(restCart.length > 0) price = + cart[0].price.slice(0, -1);

          return restCart.length * price;
      }

       getProductCount = ( code:string ) : number => {
        let product: number = 0;
        for (let i = 0; i < this.myCart.length; i++)  ( this.myCart[i].code === code ) &&  product++;
        return product;
       }

       getProductPrice = ( code:string ) : string =>  this.allProducts.find( product => product.code === code).price.slice(0, -1);

       getTotalProductPrice = ( code:string ) : number => this.getProductCount(code) * + this.getProductPrice(code);

       addProduct = ( code:string ) => this.scan(code);

       removeProduct = ( code:string ) => this.myCart.splice(this.myCart.findIndex( product => product.code === code), 1);

       getTotalWithOutDiscount = () : number =>  this.myCart.reduce( (acc, product) => acc + + product.price.slice(0, -1), 0);

       scan = (code: string): this => {
          const productToAdd = this.allProducts.find(product => product.code === code);
          let newCart : ProductModel[]  = [...this.myCart];
          newCart.push(productToAdd);
          this.myCart = newCart;
          return this;
       }

       total = () : number => this.MUGDiscount(this.myCart) + this.TSHIRTDiscount(this.myCart) + this.RESTProducts(this.myCart);


}
