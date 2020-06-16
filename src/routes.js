import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';

import Login from './pages/login';

import Main from './pages/main';

import Profile from './pages/profile';

import User from './pages/user';
import CreateUser from './pages/user/createUser';
import UserEditForm from './pages/user/editUser';

import Client from './pages/client';
import CreateClient from './pages/client/createClient';
import EditClient from './pages/client/editClient';

import Product from './pages/products';
import CreateProduct from './pages/products/createProduct';
import EditProduct from './pages/products/editProduct';

import Model from './pages/model';
import CreateModel from './pages/model/createModel';

import Project from './pages/project';
import CreateProject from './pages/project/createProject';
import EditProject from './pages/project/editProject';

import Dashboard from './pages/dashboard';
import Proposal from './pages/proposal';
import RegisterProposal from './pages/proposal/registerProposal';

import ProposalCreate from './pages/proposalCreate';

import NotFound from './components/notFound';

const Routes = () =>
(
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute exact path="/home" component={Main} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/user" component={User} />
        <PrivateRoute exact path="/user/new" component={CreateUser} />
        <PrivateRoute exact path="/user/:id" component={UserEditForm} />
        <PrivateRoute exact path="/client" component={Client} />
        <PrivateRoute exact path="/client/new" component={CreateClient} />
        <PrivateRoute exact path="/client/:id" component={EditClient} />
        <PrivateRoute exact path="/product" component={Product} />
        <PrivateRoute exact path="/product/new" component={CreateProduct} />
        <PrivateRoute exact path="/product/:id" component={EditProduct} />
        <PrivateRoute exact path="/model" component={Model} />
        <PrivateRoute exact path="/model/new" component={CreateModel} />
        <PrivateRoute exact path="/project" component={Project} />
        <PrivateRoute exact path="/project/new" component={CreateProject} />
        <PrivateRoute exact path="/project/:id" component={EditProject} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/proposal" component={Proposal} />
        <PrivateRoute exact path="/proposal/register" component={RegisterProposal} />
        <PrivateRoute exact path="/proposal/create" component={ProposalCreate} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
