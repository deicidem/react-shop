import React from 'react';
import styles from './app.css';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import routes from '~/routes';
import {routesMap, menu} from '~/routes';
import { ListGroup } from 'react-bootstrap';
import store from '~s'
@observer class App extends React.Component{
    state = {
        menuList: [...menu]
    }
    render(){
        console.log(store.cart);
        let routesComponents = routes.map((route) => {
            return <Route path={route.url}
                          component={route.component}
                          exact={route.exact} 
                          key={route.url}
                    />;
        });

        let menuList = this.state.menuList.map((el, i) => {
            return <NavLink exact={true} key={el.title} className="list-group-item" to={el.path} activeClassName={"active"}>{el.title}</NavLink>
                    
        })

        return (
            <Provider store={store}>
            <Router basename="/react-shop/">
                <div className="container">
                    <div className="row">
                        <div className="col col-sm-9">
                            <h1>Site</h1>
                        </div>
                        <div className="col col-sm-3">
                            <div className="alert alert-default">
                                In cart: {store.cart.products.length}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-sm-3">
                            <h3>Menu</h3>
                            <ListGroup>
                                {menuList}
                            </ListGroup>
                        </div>
                        <div className="col col-sm-9">
                            <div className="content">
                            <Switch>
                                {routesComponents}
                            </Switch>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Router>
            </Provider>
        )
    }
}

export default App;