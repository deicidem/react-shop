import {observable, computed, action} from 'mobx';
import productsModel from '~s/products';
class Cart{
    @observable products = []

    @computed get inCart() {
        return (id) => {
            let product = null;
            this.products.forEach(element => {
                if (element.id == id) {
                    product = element;
                    return
                }
            });
            return product != null;
        }
    }

    @computed get total(){
        return this.products.reduce((t, pr) => t + productsModel.productByID(pr.id).price * pr.current, 0);
    }

    @computed get changeOn(){
        return this.products.map((product, i) => {
            return (cnt) => this.change(i, cnt);
        });
    }

    @action changeById(id, cnt) {
        this.products.forEach((element, i) => {
            if (element.id == id) {
                this.products[i].current = cnt;
                return
            }
        });
    }

    @action change(i, cnt) {
        this.products[i].current = cnt;
    }

    @action add(id){
        this.products.push({
            id: id,
            current: 1
        })
    }

    @action remove(id){
        let n;
        this.products.forEach((el, i) => {
            if (el.id == id) n = i;
        });
        this.products.splice(n, 1)
    }

}

export default new Cart();












// server api
function getProducts(){
    return [
        {
            id: 100,
            title: 'Ipnone 200',
            price: 12000,
            rest: 10,
            current: 0
        },
        {
            id: 101,
            title: 'Samsung AAZ8',
            price: 22000,
            rest: 5,
            current: 0
        },
        {
            id: 103,
            title: 'Nokia 3310',
            price: 5000,
            rest: 2,
            current: 0
        },
        {
            id: 105,
            title: 'Huawei ZZ',
            price: 15000,
            rest: 8,
            current: 0
        }
    ];
}