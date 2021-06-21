import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Modal, ProgressBar, Table} from 'react-bootstrap';
import {observer} from 'mobx-react';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import withStore from '~/hocs/withStore';
class Order extends React.Component{
    state = {
        showModal: false,
        progress: null
    }

    show = () => {
        this.setState({showModal: true});
    }

    hide = () => {
        this.setState({showModal: false});
    }

    confirm = () => {
        this.hide();
        this.props.history.push(routesMap.result);
    }
    countProgress = (...args) => {
        let orderModel = this.props.store.order;
        let progress = 0;
        for (const name in orderModel.formData) {
            let field = orderModel.formData[name];
            if (field.valid == true) {
                progress += 100 / Object.keys(orderModel.formData).length;
            }
        }
        if (args.length) {
            this.setState({progress})
        } else {
            return progress;
        }
    }
    onChange = (name, value) => {
        this.props.store.order.change(name, value)
        this.countProgress(1);
    }
    render(){
        let orderModel = this.props.store.order;
        let cartModel = this.props.store.cart;
        let productsModel = this.props.store.products;
        let formFields = [];
        let infoList = [];
        for(let name in orderModel.formData){
            let field = orderModel.formData[name];
            
            formFields.push(
                <Form.Group key={name} controlId={'order-form-' + name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={field.value}
                        onChange={(e) => this.onChange(name, e.target.value)}
                    />
                    {field.valid === null || field.valid ? '' : 
                        <Form.Text className="text-muted">
                            {field.errorText}
                        </Form.Text>
                    }
                </Form.Group>
            );
            infoList.push(
                <tr key={field.label + field.value}>
                    <td>{field.label}</td>
                    <td>{field.value}</td>
                </tr>
            )
        }

        let productsList = cartModel.products.map((el, i) => {
            let product = productsModel.productByID(el.id);
            return (
                  <tr key={product.title}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{el.current}</td>
                  </tr>
            )
          })

        return (
            <div>
                <h2>Order</h2>
                <ProgressBar now={this.state.progress == null ? this.countProgress() : this.state.progress}/>
                <hr/>
                <Form>
                    {formFields}
                </Form>
                <Link className="btn btn-warning" to={routesMap.home}>
                    Back to cart
                </Link>
                &nbsp;
                <Button variant="primary" 
                        onClick={this.show} 
                        disabled={!orderModel.formValid}>
                    Apply order
                </Button>
                <Modal show={this.state.showModal} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Is your data correct?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {infoList}
                            <tr>
                                <td>Products</td>
                                <td>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {productsList}
                                    </tbody>
                                </Table>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.hide}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.confirm} >
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withStore(Order);