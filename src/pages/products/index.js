import React from 'react';
import { observer } from 'mobx-react';
import AppProduct from '~c/product';
import cartModel from '~s/cart';
import productsModel from '~s/products';
@observer class Products extends React.Component {
  render() {
    let productsList = productsModel.products.map((el, i) => {
      return (
        <div key={el.id} className="col col-4">
          <AppProduct 
              data={el}
              inCart={cartModel.inCart(el.id)}
              onAdd={() => {cartModel.add(el.id)}} 
              onRemove={() => {cartModel.remove(el.id)}}/>
        </div>
      )
    }) 
    return (
      <>
      <h2>Products</h2>
      <div className="row">
        {productsList}
      </div>
      </>
    )
  }
}

export default Products;