import Cart from "~s/cart";
import Products from "~s/products";
import Order from "~s/order";

class  GlobalStore {
  constructor() {
    this.cart     = new Cart(this);
    this.products = new Products(this);
    this.order    = new Order(this);
  }
}

export default new GlobalStore();