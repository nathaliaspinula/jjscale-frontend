import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import User from './pages/user';
import CreateUser from './pages/user/createUser';
import UserEditForm from './pages/user/editUser';
const Routes = () =>
(
    <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/User" component={User}></Route>
        <Route exact path="/CreateUser" component={CreateUser}></Route>
        <Route exact path="/EditUser/:id" component={UserEditForm}></Route>
    </Switch>
);

export default Routes;
