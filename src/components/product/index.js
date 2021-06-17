import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { urlBuilder } from '~/routes';
import { observer } from 'mobx-react';
@observer class Product extends React.Component{
  render () {
    return (
      <Card style={{ marginBottom: '30px' }}>
        <Card.Body>
          <Card.Title>{this.props.data.title}</Card.Title>
          <Card.Text> 
            {this.props.data.price}
            <br/>
            <Link to={urlBuilder('products', {id : this.props.data.id})}>Get more...</Link>
          </Card.Text>
          {
            this.props.inCart ?
            <Button variant="danger" onClick={this.props.onRemove}>
              Remove from cart
            </Button>
            :
            <Button variant="success" onClick={this.props.onAdd}>
              Add to cart
            </Button>
          }
        </Card.Body>
      </Card>
    )
  }
}

export default Product;