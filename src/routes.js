import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import User from './pages/user';
import CreateUser from './pages/user/createUser';
import UserEditForm from './pages/user/editUser';
import Product from './pages/products';
import CreateProduct from './pages/products/createProduct';
import PrivateRoute from './components/privateRoute';
const Routes = () =>
(
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute exact path="/home" component={Main} />
        <PrivateRoute exact path="/user" component={User} />
        <PrivateRoute exact path="/user/new" component={CreateUser} />
        <PrivateRoute exact path="/user/:id" component={UserEditForm} />
        <PrivateRoute exact path="/product" component={Product} />
        <PrivateRoute exact path="/product/new" component={CreateProduct} />
    </Switch>
);

export default Routes;
