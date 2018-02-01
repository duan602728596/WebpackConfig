import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Home from '../modules/Home/Layout';
import List from 'bundle-loader?lazy&name=list!../modules/List/Layout';
import Form from 'bundle-loader?lazy&name=form!../modules/Form/Layout';

const ListBundle: Function = asyncModule(List);
const FormBundle: Function = asyncModule(Form);

class Router extends Component{
  render(): Object{
    return (
      <Switch>
        <Route path="/" component={ Home } exact={ true } />
        <Route path="/Home" component={ Home } />
        <Route path="/List" component={ ListBundle } />
        <Route path="/Form" component={ FormBundle } />
      </Switch>
    );
  }
}

export default Router;