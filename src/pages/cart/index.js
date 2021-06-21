import React from 'react';
import AppMinMax from '~c/inputs/minmax';
import {Button} from 'react-bootstrap'
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import withStore from '~/hocs/withStore';
class Cart extends React.Component{
    render(){
        let cartModel = this.props.store.cart;
        let productsModel = this.props.store.products;
        let productsRows = cartModel.products.map((el, i) => {
            let product = productsModel.productByID(el.id);
            return (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                        <AppMinMax min={1} 
                                    max={product.rest} 
                                    cnt={el.current} 
                                    onChange={cartModel.changeOn[i]}
                        />
                    </td>
                    <td>{product.price * el.current}</td>
                    <td>
                        <Button variant="danger" onClick={() => cartModel.remove(i)}>
                            X
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Cart</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Total</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsRows}
                    </tbody> 
                </table>
                <h3>Total: {cartModel.total}</h3>
                <hr/>
                <Link to={routesMap.order} className="btn btn-primary">
                    Send
                </Link>
            </div>
        );
    }
}

export default withStore(Cart);