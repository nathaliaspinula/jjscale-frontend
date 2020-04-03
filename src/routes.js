import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import User from './pages/user';
import CreateUser from './pages/user/createUser';
import UserEditForm from './pages/user/editUser';
import Product from './pages/products';
import CreateProduct from './pages/products/createProduct';

const Routes = () =>
(
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Main}></Route>
        <Route exact path="/user" component={User}></Route>
        <Route exact path="/user/new" component={CreateUser}></Route>
        <Route exact path="/user/:id" component={UserEditForm}></Route>
        <Route exact path="/product" component={Product}></Route>
        <Route exact path="/product/new" component={CreateProduct}></Route>
    </Switch>
);

export default Routes;
