import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from '../../assembly/Main/index';
import Content from '../../assembly/Content/index';
import Index from './Index/index';

class ModuleLayout extends Component{
  render(): Array{
    return [
      <Helmet key={ 0 }>
        <title>Webpack App</title>
      </Helmet>,
      <Main key={ 1 }>
        <Content>
          <Switch>
            <Route path="/" component={ Index } exact={ true } />
            <Route path="/Index" component={ Index } exact={ true } />
          </Switch>
        </Content>
      </Main>
    ];
  }
}

export default ModuleLayout;