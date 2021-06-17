import React from 'react';
import cartModel from '~s/cart';
import productsModel from '~s/products';
import { Link } from 'react-router-dom';
import {routesMap} from "~/routes";
import {Button} from "react-bootstrap";
import { observer } from 'mobx-react';
@observer class Product extends React.Component {
  render() {
    let product = productsModel.productByID(this.props.match.params.id)
    return (
      <div>
        <Link to={routesMap.home}>Back to products</Link>
        <h1>{product.title}</h1>
        <hr/>
        <div className="alert alert-success">{product.price}</div>
        {
          cartModel.inCart(product.id) ?
          <Button variant="danger" onClick={() => {
            cartModel.remove(product.id);
          }}>
            Remove from cart
          </Button>
          :
          <Button variant="success" onClick={() => {
            cartModel.add(product.id);
          }}>
            Add to cart
          </Button>
        }

      </div>
    )
  }
}

export default Product;