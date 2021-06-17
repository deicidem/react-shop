import Cart from '~p/Cart';
import Order from '~p/Order';
import Result from '~p/Result';
import Products from '~p/Products';
import Product from '~p/Product';
import Page404 from '~p/error404';

let routes = [
    {
        name: 'home',
        url: '/',
        component: Products,
        exact: true
    },
    {
        name: 'cart',
        url: '/cart',
        component: Cart,
        exact: true
    },
    {
        name: 'order',
        url: '/order',
        component: Order,
        exact: true
    },
    {
        name: 'result',
        url: '/done',
        component: Result,
        exact: true
    },
    {
        name: 'products',
        url: "/products/:id",
        component: Product,
        exact: true
    },
    {
        url: '**',
        component: Page404
    },

];



let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let menu = [
    {
        title: "Home",
        path: routesMap.home,
        active: true,
        setActive(val){
            this.active = val
        }
    },
    {
        title: "Cart",
        path: routesMap.cart,
        active: false,
        setActive(val){
            this.active = val
        }
    },
    {
        title: "Order",
        path: routesMap.order,
        active: false,
        setActive(val){
            this.active = val
        }
    }
]

let urlBuilder = function(name, params){
    if(!routesMap.hasOwnProperty(name)){
        return null;
    }

    let url = routesMap[name]; // news/:id

    for(let key in params){
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export {routesMap, urlBuilder, menu};