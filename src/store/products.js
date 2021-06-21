import {observable, computed, action} from 'mobx';

export default class {
  @observable products =  getProducts()

  @computed get productByID() {
    return (id) => {
      let product;
      this.products.forEach(element => {
        if (element.id == id) {
          product = element;
          return
        }
      });
      return product;
    }
  }
}













function getProducts(){
  return [
      {
          id: 100,
          title: 'Ipnone 200',
          price: 12000,
          rest: 10,
      },
      {
          id: 101,
          title: 'Samsung AAZ8',
          price: 22000,
          rest: 5,
      },
      {
          id: 103,
          title: 'Nokia 3310',
          price: 5000,
          rest: 2,
      },
      {
          id: 105,
          title: 'Huawei ZZ',
          price: 15000,
          rest: 8,
      }
  ];
}

